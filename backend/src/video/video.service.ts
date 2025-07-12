import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { CreateVideoDto } from "./dto/create-video.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Video } from "./video.schema";
import { Model, Types } from "mongoose";
import { parseField } from "src/utils/parseField";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { extractPublicId } from "src/utils/extractPublicId";
import { GetElasticSearchDto } from "src/elastic-search/dto/get-elastic-search.dto";
import { Slugify } from "src/utils/slugify";
import { ChannelService } from "src/channel/channel.service";
import { GetUserDto } from "src/user/dto/get-user.dto";
import { VideoStatus } from "./enums";
import { TypedEventEmitter } from "src/core/typed-event-emitter.service";
import { SocketIoService } from "src/socket/socket-io.service";
import { Transform } from "stream";
import * as fs from "fs";

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);
  constructor(
    private config: ConfigService,
    private channelService: ChannelService,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private eventEmitter: EventEmitter2,
    private readonly emitter: TypedEventEmitter,
    private socketService: SocketIoService
  ) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  async streamUploadVideo(video: Express.Multer.File): Promise<{
    publicId: string;
    videoUrl: string;
    duration: number;
    bytes: number;
  }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          chunk_size: 6000000,
          folder: "my-tube/videos",
        },
        async (error, result) => {
          if (error) return reject(error);

          return resolve({
            publicId: result.public_id,
            videoUrl: result.secure_url,
            duration: result.duration,
            bytes: result.bytes,
          });
        }
      );
      const readable = Readable.from(video.buffer);
      readable.pipe(uploadStream);
    });
  }

  async streamUploadVideoWithSocket(
    video: Express.Multer.File,
    userId: string
  ): Promise<{
    publicId: string;
    videoUrl: string;
    duration: number;
    bytes: number;
  }> {
    const io = this.socketService.getSocketServer();
    const logger = this.logger;
    const filePath = video.path;
    const stats = fs.statSync(filePath);
    const totalSize = stats.size;
    let uploadedSize = 0;

    return new Promise((resolve, reject) => {
      const progressStream = new Transform({
        transform(chunk, encoding, callback) {
          uploadedSize += chunk.length;
          const percent = Math.round((uploadedSize / totalSize) * 100);
          logger.log(`The video is uploaded: ${percent}%`);
          io.to(userId).emit("video-upload-progress", { percent });
          callback(null, chunk);
        },
      });

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          chunk_size: 6000000,
          folder: "my-tube/videos",
        },
        async (error, result) => {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr)
              logger.error("Error deleting local file:", unlinkErr);
          });

          if (error) {
            return reject(error);
          }

          return resolve({
            publicId: result.public_id,
            videoUrl: result.secure_url,
            duration: result.duration,
            bytes: result.bytes,
          });
        }
      );

      fs.createReadStream(filePath)
        .on("error", (err) => {
          fs.unlink(filePath, () => {});
          reject(err);
        })
        .pipe(progressStream)
        .pipe(uploadStream);
    });
  }

  async uploadVideoThumbnail(thumbnail: Express.Multer.File): Promise<string> {
    if (!thumbnail) {
      throw new HttpException(
        "Thumbnail file is missing",
        HttpStatus.BAD_REQUEST
      );
    }
    const logger = this.logger;

    const filePath = thumbnail.path;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "my-tube/video-thumbnails",
        },
        async (error, result) => {
          try {
            if (error) return reject(error);

            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr)
                logger.error("Error deleting local file:", unlinkErr);
            });

            resolve(result.secure_url);
          } catch (err) {
            reject(err);
          }
        }
      );

      fs.createReadStream(filePath)
        .on("error", (err) => {
          fs.unlink(filePath, () => {});
          reject(err);
        })
        .pipe(uploadStream);
    });
  }

  async getDefaultThumbnail(publicId: string): Promise<string> {
    if (!publicId) {
      throw new HttpException("Public ID is missing", HttpStatus.BAD_REQUEST);
    }

    return cloudinary.url(publicId, {
      resource_type: "video",
      format: "jpg",
      secure: true,
    });
  }

  async create(
    video: Express.Multer.File,
    thumbnail: Express.Multer.File,
    body: CreateVideoDto
  ) {
    if (!video) {
      throw new HttpException("File is missing", HttpStatus.BAD_REQUEST);
    }

    const { publicId, videoUrl, duration, bytes } =
      await this.streamUploadVideoWithSocket(video, body.owner.toString());

    if (thumbnail && typeof thumbnail === "object" && "path" in thumbnail) {
      body.thumbnailUrl = await this.uploadVideoThumbnail(thumbnail);
    } else {
      body.thumbnailUrl = await this.getDefaultThumbnail(publicId);
    }

    const newVideoData: CreateVideoDto = {
      publicId,
      videoUrl,
      thumbnailUrl: body.thumbnailUrl,
      duration,
      size: bytes,
      tags: parseField(body?.tags),
      title: body.title,
      description: body.description,
      dislikes: [],
      likes: [],
      views: 0,
      owner: new Types.ObjectId(body.owner),
      slug: Slugify.generateVideoSlug(body.title, publicId),
    };

    const uploadedVideo: any = await this.videoModel.create(newVideoData);

    const newVideo: any = await this.videoModel
      .findById(uploadedVideo._id)
      .populate("owner", "-password");

    if (body?.playlistId) {
      this.eventEmitter.emit("video-added-to-playlist", {
        playlistId: body.playlistId,
        videoId: newVideo?.id || newVideo?._id,
      });
    }

    // fire event for new-video-uploaded
    this.eventEmitter.emit("new-video-upload.created", {
      id: newVideo?.id || newVideo?._id,
      title: newVideo?.title || "",
      description: newVideo?.description || "",
      tags: newVideo?.tags || [],
      channel: newVideo?.owner?.name || "",
    });

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Your video has been uploaded successfully",
      data: null,
    };
  }

  async getOwnerVideos(owner: string) {
    const videos = await this.videoModel
      .find({ owner: new Types.ObjectId(owner) })
      .sort({ createdAt: -1 });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All the videos of owner retrieved successfully",
      data: videos,
    };
  }

  async getVideosByIds(ids: (Types.ObjectId | string)[]) {
    const objectIds = ids.map((id) =>
      typeof id === "string" ? new Types.ObjectId(id) : id
    );

    const videos = await this.videoModel
      .find({ _id: { $in: objectIds }, status: VideoStatus.PUBLISHED })
      .sort({ createdAt: -1 })
      .populate("owner", "-password");

    return videos;
  }

  async getElasticVideoDocs(): Promise<GetElasticSearchDto[]> {
    const videos = await this.videoModel
      .find({})
      .select("id title description tags owner")
      .populate("owner", "-password");

    return videos.map(
      (video: any) =>
        new GetElasticSearchDto(
          video.id,
          video.title,
          video.description,
          video.tags,
          (video.owner?.name as string) || ""
        )
    );
  }

  async getOwnerVideosForChannel(owner: Types.ObjectId) {
    const videos = await this.videoModel
      .find({ owner: new Types.ObjectId(owner), status: VideoStatus.PUBLISHED })
      .sort({ createdAt: -1 })
      .populate("owner", "-password");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All the videos of a channel retrieved successfully",
      data: videos,
    };
  }

  async performBestVideosQuery(userId?: string) {
    let personalizedVideos: any[] = [];

    if (userId) {
      const result = await this.channelService.getChannels(userId);

      const subscribedChannels = (result?.data as GetUserDto[])?.map(
        (c) => c.id || c._id
      );

      if (subscribedChannels.length) {
        const subscribedVideos = await this.videoModel
          .find({ owner: { $in: subscribedChannels } })
          .sort({ createdAt: -1 })
          .limit(20)
          .populate("owner", "-password");

        personalizedVideos.push(...subscribedVideos);
      }
    }

    const trendingVideos = await this.videoModel
      .find({ status: VideoStatus.PUBLISHED })
      .sort({ views: -1 })
      .limit(10)
      .populate("owner", "-password");

    const latestVideos = await this.videoModel
      .find({ status: VideoStatus.PUBLISHED })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("owner", "-password");

    const allVideos = [
      ...personalizedVideos,
      ...trendingVideos,
      ...latestVideos,
    ];

    const uniqueVideosMap = new Map<string, any>();
    for (const video of allVideos) {
      uniqueVideosMap.set(video._id.toString(), video);
    }

    const finalFeed = Array.from(uniqueVideosMap.values());

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Personalized video feed retrieved",
      data: finalFeed,
    };
  }

  async findAll(
    searchText: string,
    filters: Record<string, string>,
    limit = 10,
    page = 1
  ) {
    const query: any = {};

    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        { tags: { $in: [new RegExp(searchText, "i")] } },
      ];
    }

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (key === "owner") {
          query.owner = new Types.ObjectId(value);
        } else if (key === "duration" || key === "size" || key === "views") {
          query[key] = Number(value);
        } else {
          query[key] = value;
        }
      }
    }

    const skip = (page - 1) * limit;

    const [videos, total] = await Promise.all([
      this.videoModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("owner", "-password"),
      this.videoModel.countDocuments(query),
    ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Videos retrieved successfully",
      data: {
        total,
        page,
        limit,
        videos,
      },
    };
  }

  async searchVideo(searchText: string) {
    const query: any = {};

    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        { tags: { $in: [new RegExp(searchText, "i")] } },
      ];
    }

    const videos = await this.videoModel
      .find(query)
      .sort({ createdAt: -1 })
      .populate("owner", "-password");

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Videos search result retrieved successfully",
      data: videos,
    };
  }

  async relatedVideos(currentVideoId: Types.ObjectId) {
    const objectId = new Types.ObjectId(currentVideoId);
    const currentVideo = await this.videoModel.findById(objectId);
    if (!currentVideo) {
      throw new HttpException("Video not found", HttpStatus.NOT_FOUND);
    }

    const { title = "", description = "", tags = [] } = currentVideo;

    const matchQuery = {
      _id: { $ne: objectId },
      $or: [
        { title: { $regex: title.split(" ")[0], $options: "i" } },
        { description: { $regex: description.split(" ")[0], $options: "i" } },
        { tags: { $in: tags.map((tag) => new RegExp(tag, "i")) } },
      ],
    };

    const matchedVideos = await this.videoModel
      .find(matchQuery)
      .limit(10)
      .populate("owner", "-password");

    const matchedIds = matchedVideos.map((video) => video._id);

    const unmatchedVideos = await this.videoModel
      .find({
        _id: {
          $nin: [objectId, ...matchedIds],
        },
      })
      .limit(10)
      .sort({ createdAt: -1 })
      .populate("owner", "-password");

    const videos = [...matchedVideos, ...unmatchedVideos];

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Related videos retrieved successfully",
      data: videos,
    };
  }

  async findOne(id: Types.ObjectId) {
    const video: any = await this.videoModel
      .findById(id)
      .populate("owner", "-password");

    const subscriptions = await this.channelService.getTotalSubscriptions(
      video.owner?.id
    );

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video retrieved successfully",
      data: {
        ...video._doc,
        id: video._id,
        owner: {
          ...video?._doc?.owner?._doc,
          subscriptions,
          id: video?.owner?._id,
        },
      },
    };
  }

  async findOneBySlug(slug: string, viewer: string) {
    const video: any = await this.videoModel
      .findOne({ slug })
      .populate("owner", "-password");

    const subscriptions = await this.channelService.getTotalSubscriptions(
      video.owner?.id
    );

    // event fire to decrease like on user activity
    this.emitter.emit("user-activity-watch-history", {
      userId: viewer,
      video: { videoId: video._id, duration: video?.duration || 0 },
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video retrieved successfully",
      data: {
        ...video._doc,
        id: video._id,
        owner: {
          ...video?._doc?.owner?._doc,
          subscriptions,
          id: video?.owner?._id,
        },
      },
    };
  }

  async update(id: Types.ObjectId, updatedData: UpdateVideoDto) {
    await this.videoModel.findByIdAndUpdate(id, { ...updatedData });

    const video: any = await this.videoModel
      .findById(id)
      .populate("owner", "-password");

    // fire event to update this video doc on elastic search
    this.eventEmitter.emit("video-update-elastic.updated", {
      id: video?.id || video?._id,
      title: video?.title || "",
      description: video?.description || "",
      tags: video?.tags || [],
      channel: video?.owner?.name || "",
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video updated successfully",
      data: null,
    };
  }

  async updateVideoStatus(videoId: Types.ObjectId, status: VideoStatus) {
    await this.videoModel.findByIdAndUpdate(videoId, {
      $set: { status: status },
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `Video status updated to '${status}' successfully`,
      data: null,
    };
  }

  async remove(id: Types.ObjectId) {
    const video = await this.videoModel.findById(id);

    if (!video) {
      throw new HttpException("Video was not found!", HttpStatus.NOT_FOUND);
    }

    await this.videoModel.findByIdAndDelete(id);

    this.eventEmitter.emit("video.deleted", video?.publicId);
    this.eventEmitter.emit(
      "thumbnail.deleted",
      extractPublicId(video?.thumbnailUrl)
    );
    this.eventEmitter.emit("video-elastic.deleted", {
      id: video?.id || video?._id,
      title: video?.title || "",
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video deleted successfully",
      data: null,
    };
  }

  async incrementViews(id: Types.ObjectId) {
    await this.videoModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video views incremented successfully",
      data: null,
    };
  }

  async likeVideo(id: Types.ObjectId, liker: Types.ObjectId) {
    const video = await this.videoModel.findById(id);
    if (!video) throw new NotFoundException("Video not found");

    const likerIdStr = liker.toString();

    const hasLiked = video.likes.some(
      (userId) => userId.toString() === likerIdStr
    );
    const hasDisliked = video.dislikes.some(
      (userId) => userId.toString() === likerIdStr
    );

    if (hasLiked) {
      video.likes = video.likes.filter(
        (userId) => userId.toString() !== likerIdStr
      );
    } else {
      video.likes.push(liker);
      if (hasDisliked) {
        video.dislikes = video.dislikes.filter(
          (userId) => userId.toString() !== likerIdStr
        );
      }
    }

    await video.save();

    // event fire to increase like on user activity
    this.emitter.emit("user-activity-like-comment-subscribe", {
      userId: likerIdStr,
      type: "like",
      action: "increase",
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: hasLiked ? "Like removed" : "Video liked",
      data: null,
    };
  }

  async dislikeVideo(id: Types.ObjectId, liker: Types.ObjectId) {
    const video = await this.videoModel.findById(id);
    if (!video) throw new NotFoundException("Video not found");

    const likerIdStr = liker.toString();

    const hasDisliked = video.dislikes.some(
      (userId) => userId.toString() === likerIdStr
    );
    const hasLiked = video.likes.some(
      (userId) => userId.toString() === likerIdStr
    );

    if (hasDisliked) {
      video.dislikes = video.dislikes.filter(
        (userId) => userId.toString() !== likerIdStr
      );
    } else {
      video.dislikes.push(liker);
      if (hasLiked) {
        video.likes = video.likes.filter(
          (userId) => userId.toString() !== likerIdStr
        );
      }
    }

    await video.save();

    // event fire to decrease like on user activity
    this.emitter.emit("user-activity-like-comment-subscribe", {
      userId: likerIdStr,
      type: "like",
      action: "decrease",
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: hasDisliked ? "Dislike removed" : "Video disliked",
      data: null,
    };
  }

  async updateVideoThumbnail(id: Types.ObjectId, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException("File is missing", HttpStatus.BAD_REQUEST);
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "my-tube/video-thumbnails",
        },
        async (error, result) => {
          if (error) return reject(error);

          try {
            const video = await this.videoModel.findById(id);
            if (!video) {
              throw new HttpException(
                "Video was not found!",
                HttpStatus.NOT_FOUND
              );
            }

            await this.videoModel.findByIdAndUpdate(id, {
              $set: { thumbnailUrl: result?.secure_url },
            });

            if (video?.thumbnailUrl) {
              const thumbnailPublicId = extractPublicId(video.thumbnailUrl);

              if (thumbnailPublicId && thumbnailPublicId !== video.publicId) {
                this.eventEmitter.emit("thumbnail.deleted", thumbnailPublicId);
              }
            }

            resolve({
              statusCode: HttpStatus.OK,
              success: true,
              message: "Your video thumbnail updated successfully",
              data: null,
            });
          } catch (dbError) {
            reject(
              new HttpException(
                "Failed to update video thumbnail",
                HttpStatus.INTERNAL_SERVER_ERROR
              )
            );
          }
        }
      );

      const readableStream = Readable.from(file.buffer);
      readableStream.pipe(uploadStream);
    });
  }

  async blockAVideo(id: Types.ObjectId) {
    await this.videoModel.findByIdAndUpdate(id, {
      $set: { status: VideoStatus.BLOCKED },
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "The video has been blocked successfully",
      data: null,
    };
  }

  async unblockAVideo(id: Types.ObjectId) {
    await this.videoModel.findByIdAndUpdate(id, {
      $set: { status: VideoStatus.PUBLISHED },
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "The video has been unblocked successfully",
      data: null,
    };
  }
  async bulkDelete(ids: Types.ObjectId[]) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException("No video IDs provided.");
    }

    const invalidIds = ids.filter((id) => !Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `Invalid ObjectId(s): ${invalidIds.join(", ")}`
      );
    }

    const result = await this.videoModel.deleteMany({ _id: { $in: ids } });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `${result.deletedCount} videos deleted successfully.`,
      data: {
        deletedCount: result.deletedCount,
      },
    };
  }

  async getVideosByStatus(status: string) {
    const videos = await this.videoModel
      .find({ status })
      .populate("owner", "-password");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "The video has been unblocked successfully",
      data: videos,
    };
  }

  async getStatsForVideoOwner(owner: Types.ObjectId) {
    const stats = await this.videoModel.aggregate([
      { $match: { owner } },
      {
        $facet: {
          totalVideos: [{ $count: "count" }],
          totalViews: [{ $group: { _id: null, views: { $sum: "$views" } } }],
          totalLikes: [
            { $project: { likesCount: { $size: "$likes" } } },
            { $group: { _id: null, likes: { $sum: "$likesCount" } } },
          ],
          totalDislikes: [
            { $project: { dislikesCount: { $size: "$dislikes" } } },
            { $group: { _id: null, dislikes: { $sum: "$dislikesCount" } } },
          ],
          totalSize: [{ $group: { _id: null, size: { $sum: "$size" } } }],
          videosByStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
        },
      },
    ]);

    const result = stats[0];

    return {
      totalVideos: result.totalVideos[0]?.count || 0,
      totalViews: result.totalViews[0]?.views || 0,
      totalLikes: result.totalLikes[0]?.likes || 0,
      totalDislikes: result.totalDislikes[0]?.dislikes || 0,
      totalSize: result.totalSize[0]?.size || 0,
      videosByStatus: result.videosByStatus.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
    };
  }

  async getStatsForAdmin(query?: {
    startDate?: string;
    endDate?: string;
    owner?: string;
    status?: string;
  }) {
    const match: Record<string, any> = {};

    if (query.startDate || query.endDate) {
      match.createdAt = {};
      if (query.startDate) {
        match.createdAt.$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        match.createdAt.$lte = new Date(query.endDate);
      }
    }

    if (query.owner) {
      match.owner = new Types.ObjectId(query.owner); // Important!
    }

    if (query.status) {
      match.status = query.status;
    }

    const stats = await this.videoModel.aggregate([
      { $match: match },
      {
        $facet: {
          totalVideos: [{ $count: "count" }],
          totalViews: [{ $group: { _id: null, views: { $sum: "$views" } } }],
          totalLikes: [
            { $project: { likesCount: { $size: "$likes" } } },
            { $group: { _id: null, likes: { $sum: "$likesCount" } } },
          ],
          totalDislikes: [
            { $project: { dislikesCount: { $size: "$dislikes" } } },
            { $group: { _id: null, dislikes: { $sum: "$dislikesCount" } } },
          ],
          totalSize: [{ $group: { _id: null, size: { $sum: "$size" } } }],
          videosByStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
        },
      },
    ]);

    const result = stats[0];

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Videos stats analytics retrieved successfully",
      data: {
        totalVideos: result.totalVideos[0]?.count || 0,
        totalViews: result.totalViews[0]?.views || 0,
        totalLikes: result.totalLikes[0]?.likes || 0,
        totalDislikes: result.totalDislikes[0]?.dislikes || 0,
        totalSize: result.totalSize[0]?.size || 0,
        videosByStatus: result.videosByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
      },
    };
  }
}
