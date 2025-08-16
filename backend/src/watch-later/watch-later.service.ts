import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { WatchLater } from "./watch-later.schema";
import { CreateWatchLaterDto } from "./dto/create-watch-later.dto";

@Injectable()
export class WatchLaterService {
  constructor(
    @InjectModel(WatchLater.name) private watchLaterModel: Model<WatchLater>
  ) {}

  async create(createWatchLaterDto: CreateWatchLaterDto) {
    const { user, video } = createWatchLaterDto;

    const existing = await this.watchLaterModel.findOne({ user, video });
    if (existing) {
      return {
        statusCode: HttpStatus.CONFLICT,
        success: false,
        message: "Video already in watch later list",
        data: null,
      };
    }

    await this.watchLaterModel.create({ user, video });

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Video added to watch later",
      data: null,
    };
  }

  async remove(userId: string, videoId: string) {
    const deleted = await this.watchLaterModel.findOneAndDelete({
      user: new Types.ObjectId(userId),
      video: new Types.ObjectId(videoId),
    });

    if (!deleted) {
      throw new NotFoundException("Video not found in watch later list");
    }

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video removed from watch later",
      data: null,
    };
  }

  async findAllByUser(userId: string) {
    const watchLaterVideos = await this.watchLaterModel
      .find({ user: new Types.ObjectId(userId) })
      .populate([
        {
          path: "video",
          model: "Video",
          select: "title slug thumbnailUrl views likes duration owner",
          populate: {
            path: "owner",
            model: "User",
            select: "name slug photo",
          },
        },
      ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Watch later videos fetched",
      data: watchLaterVideos,
    };
  }

  // Check if a video is already in watch later
  async isVideoInWatchLater(userId: string, videoId: string) {
    const exists = await this.watchLaterModel.exists({
      user: new Types.ObjectId(userId),
      video: new Types.ObjectId(videoId),
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: exists
        ? "Video is in watch later"
        : "Video is not in watch later",
      data: !!exists,
    };
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [videos, total] = await Promise.all([
      this.watchLaterModel
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name")
        .populate("video", "title"),
      this.watchLaterModel.countDocuments({}),
    ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Watch later videos retrieved successfully",
      data: {
        total,
        page,
        limit,
        videos,
      },
    };
  }

  async deleteWatchLater(id: string) {
    await this.watchLaterModel.findByIdAndDelete(id);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Watch later video deleted successfully",
      data: null,
    };
  }
}
