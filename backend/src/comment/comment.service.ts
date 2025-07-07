import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CommentStatus } from "./enums";
import { TypedEventEmitter } from "src/core/typed-event-emitter.service";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly emitter: TypedEventEmitter
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    await this.commentModel.create(createCommentDto);

    // fire event to increase comment on user activity
    this.emitter.emit("user-activity-like-comment-subscribe", {
      userId: createCommentDto.user.toString(),
      type: "comment",
      action: "increase",
    });

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Comment added successfully",
      data: null,
    };
  }

  async findAll() {
    const comments = await this.commentModel
      .find({})
      .populate("user", "-password")
      .populate("video", "title")
      .sort({ createdAt: -1 });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
    };
  }

  async findAllByVideo(videoId: Types.ObjectId) {
    const comments = await this.commentModel
      .find({ video: new Types.ObjectId(videoId) })
      .populate("user", "-password")
      .populate("video", "title")
      .sort({ createdAt: -1 });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comments by video retrieved successfully",
      data: comments,
    };
  }

  async findAllByUser(userId: Types.ObjectId) {
    const comments = await this.commentModel
      .find({ user: new Types.ObjectId(userId) })
      .populate("user", "-password")
      .populate("video", "title")
      .sort({ createdAt: -1 });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comments by user retrieved successfully",
      data: comments,
    };
  }

  async findOne(id: Types.ObjectId) {
    const comment = await this.commentModel
      .findById(id)
      .populate("user", "-password")
      .populate("video", "title");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment retrieved successfully",
      data: comment,
    };
  }

  async findAllWithFilters(query: any) {
    const { page = 1, limit = 10, status, video, user, searchQuery } = query;

    const filter: any = {};

    if (searchQuery) {
      filter.$or = [{ text: { $regex: searchQuery, $options: "i" } }];
    }

    if (status) filter.status = status;
    if (video) filter.video = video;
    if (user) filter.user = user;

    const comments = await this.commentModel
      .find(filter)
      .populate("user", "name slug")
      .populate("video", "title slug")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await this.commentModel.countDocuments(filter);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    };
  }

  async update(id: Types.ObjectId, text: string) {
    await this.commentModel.findByIdAndUpdate(id, { $set: { text } });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment updated successfully",
      data: null,
    };
  }

  async remove(id: Types.ObjectId) {
    await this.commentModel.findByIdAndDelete(id);

    // fire event to increase comment on user activity
    this.emitter.emit("user-activity-like-comment-subscribe", {
      userId: id.toString(),
      type: "comment",
      action: "decrease",
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment deleted successfully",
      data: null,
    };
  }

  async blockAComment(id: string) {
    await this.commentModel.findByIdAndUpdate(new Types.ObjectId(id), {
      $set: { status: CommentStatus.BLOCKED },
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment has been blocked successfully",
      data: null,
    };
  }

  async unblockAComment(id: string) {
    await this.commentModel.findByIdAndUpdate(new Types.ObjectId(id), {
      $set: { status: CommentStatus.ACTIVE },
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment has been unblocked successfully",
      data: null,
    };
  }

  async getCommentsStatsAnalytics() {
    const [totalCount, statusDistribution, topCommenters, mostCommentedVideos] =
      await Promise.all([
        this.commentModel.countDocuments(),

        this.commentModel.aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              status: "$_id",
              count: 1,
              _id: 0,
            },
          },
        ]),

        this.commentModel.aggregate([
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
          { $unwind: "$user" },
          {
            $project: {
              id: "$user._id",
              name: "$user.name",
              slug: "$user.slug",
              count: 1,
            },
          },
        ]),

        this.commentModel.aggregate([
          {
            $group: {
              _id: "$video",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: "videos",
              localField: "_id",
              foreignField: "_id",
              as: "video",
            },
          },
          { $unwind: "$video" },
          {
            $project: {
              id: "$video._id",
              title: "$video.title",
              slug: "$video.slug",
              count: 1,
            },
          },
        ]),
      ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comments analytics retrieved successfully",
      data: {
        totalCount,
        statusDistribution,
        topCommenters,
        mostCommentedVideos,
      },
    };
  }
}
