import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { Playlist } from "./playlist.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Slugify } from "src/utils/slugify";
import { QueryPlaylistDto } from "./dto/query-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { PlaylistStatus } from "./enums";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    createPlaylistDto.slug = Slugify.generatePlaylistSlug(
      createPlaylistDto.name
    );
    const playlist = await this.playlistModel.create(createPlaylistDto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Playlist created successfully",
      data: playlist,
    };
  }

  async getAllByUser(userId: string) {
    const playlists = await this.playlistModel.find({ user: userId }).populate([
      {
        path: "videos",
        select: "title slug",
      },
    ]);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlists fetched successfully",
      data: playlists,
    };
  }

  async getOne(id: string) {
    const playlist = await this.playlistModel.findById(id).populate([
      {
        path: "videos",
        populate: {
          path: "owner",
          model: "User",
          select: "-password",
        },
      },
      {
        path: "user",
        model: "User",
        select: "-password",
      },
    ]);

    if (!playlist) {
      throw new HttpException("Playlist not found", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlist fetched successfully",
      data: playlist,
    };
  }

  async getOneBySlug(slug: string) {
    const playlist = await this.playlistModel.findOne({ slug }).populate([
      {
        path: "videos",
        populate: {
          path: "owner",
          select: "-password",
        },
      },
    ]);

    if (!playlist) {
      throw new HttpException("Playlist not found", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlist fetched successfully",
      data: playlist,
    };
  }

  async update(id: string, updateDto: { name?: string }) {
    const playlist = await this.playlistModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlist updated successfully",
      data: playlist,
    };
  }

  async remove(id: string) {
    await this.playlistModel.findByIdAndDelete(id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlist deleted successfully",
      data: null,
    };
  }

  async addVideo(playlistId: string, videoId: string) {
    const playlist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $addToSet: { videos: videoId } },
      { new: true }
    );
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video added to playlist",
      data: playlist,
    };
  }

  async removeVideo(playlistId: string, videoId: string) {
    const playlist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $pull: { videos: videoId } },
      { new: true }
    );
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video removed from playlist",
      data: playlist,
    };
  }

  async reorderVideos(playlistId: string, videoIds: string[]) {
    const playlist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { videos: videoIds },
      { new: true }
    );

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Videos reordered in playlist",
      data: playlist,
    };
  }

  async findAll(queries: QueryPlaylistDto) {
    const { searchQuery, limit = 10, page = 1 } = queries;

    const filter: any = {};

    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { slug: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.playlistModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name email slug")
        .populate("videos", "title thumbnail slug"),
      this.playlistModel.countDocuments(filter),
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: "Playlists fetched successfully",
      success: true,
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updatePlaylist(playlistId: Types.ObjectId, dto: UpdatePlaylistDto) {
    const playlist: any = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new NotFoundException("Playlist not found");
    }

    if (dto.name) playlist.name = dto.name;
    if (dto.slug) playlist.slug = dto.slug;
    if (dto.status) playlist.status = dto.status;
    if (dto.videos) playlist.videos = dto.videos;
    if (dto.user) playlist.user = dto.user;

    await playlist.save();
    return {
      statusCode: HttpStatus.OK,
      message: "Playlist updated successfully",
      success: true,
      data: playlist,
    };
  }

  async blockPlaylist(id: Types.ObjectId) {
    await this.playlistModel.findByIdAndUpdate(id, {
      $set: { status: PlaylistStatus.BLOCKED },
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Playlist has been blocked successfully",
      success: true,
      data: null,
    };
  }

  async unblockPlaylist(id: Types.ObjectId) {
    await this.playlistModel.findByIdAndUpdate(id, {
      $set: { status: PlaylistStatus.PUBLIC },
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Playlist has been unblocked successfully",
      success: true,
      data: null,
    };
  }

  async getPlayListsStats() {
    const playlists = await this.playlistModel.aggregate([
      {
        $facet: {
          totalPlaylists: [{ $count: "count" }],
          statusDistribution: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                status: "$_id",
                count: 1,
              },
            },
          ],
          avgVideosPerPlaylist: [
            {
              $project: {
                videoCount: { $size: "$videos" },
              },
            },
            {
              $group: {
                _id: null,
                averageVideos: { $avg: "$videoCount" },
              },
            },
          ],
          totalVideos: [
            {
              $project: {
                videoCount: { $size: "$videos" },
              },
            },
            {
              $group: {
                _id: null,
                totalVideos: { $sum: "$videoCount" },
              },
            },
          ],
          topUsers: [
            {
              $group: {
                _id: "$user",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $project: {
                _id: 0,
                id: "$user._id",
                username: "$user.username",
                slug: "$user.slug",
                playlistCount: "$count",
              },
            },
          ],
        },
      },
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: "Playlists analytics retrieved successfully",
      success: true,
      data: playlists[0],
    };
  }
}
