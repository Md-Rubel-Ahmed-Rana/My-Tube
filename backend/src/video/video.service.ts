import {
  HttpException,
  HttpStatus,
  Injectable,
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

@Injectable()
export class VideoService {
  constructor(
    private config: ConfigService,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private eventEmitter: EventEmitter2
  ) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  async uploadVideo(file: Express.Multer.File, body: CreateVideoDto) {
    if (!file) {
      throw new HttpException("File is missing", HttpStatus.BAD_REQUEST);
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          chunk_size: 6000000,
          folder: "my-tube/videos",
        },
        async (error, result) => {
          if (error) return reject(error);

          const newVideoData: CreateVideoDto = {
            publicId: result.public_id,
            videoUrl: result.secure_url,
            thumbnailUrl: cloudinary.url(result.public_id, {
              resource_type: "video",
              format: "jpg",
              secure: true,
            }),
            duration: result.duration,
            size: result.bytes,
            tags: parseField(body?.tags),
            title: body.title,
            description: body.description,
            dislikes: [],
            likes: [],
            views: 0,
            owner: new Types.ObjectId(body.owner),
          };

          await this.newVideo(newVideoData);

          return resolve({
            statusCode: HttpStatus.CREATED,
            success: true,
            message: "Your video uploaded successfully",
            data: null,
          });
        }
      );
      const readable = Readable.from(file.buffer);
      readable.pipe(uploadStream);
    });
  }

  async newVideo(createNewVideoDto: CreateVideoDto) {
    return this.videoModel.create(createNewVideoDto);
  }

  async getOwnerVideos(owner: string) {
    const videos = await this.videoModel
      .find({ owner })
      .sort({ createdAt: -1 });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All the videos of owner retrieved successfully",
      data: videos,
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

  async findOne(id: Types.ObjectId) {
    const video = await this.videoModel
      .findById(id)
      .populate("owner", "-password");

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video retrieved successfully",
      data: video,
    };
  }

  async update(id: Types.ObjectId, updatedData: UpdateVideoDto) {
    await this.videoModel.findByIdAndUpdate(id, { ...updatedData });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video updated successfully",
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

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: hasDisliked ? "Dislike removed" : "Video disliked",
      data: null,
    };
  }
}
