import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateUserActivityDto } from "./dto/create-user-activity.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserActivity } from "./user-activity.schema";
import { Model, Types } from "mongoose";
import { orderWatchTrend } from "src/utils/orderWatchTrend";
import { UpdateWatchHistory } from "./dto/update-watch-history.activity";
import { calculateVideoDurationToMinutes } from "src/utils/calculateVideoDurationToMinutes";

@Injectable()
export class UserActivityService {
  private readonly logger = new Logger(UserActivityService.name);
  constructor(
    @InjectModel(UserActivity.name)
    private userActivityModel: Model<UserActivity>
  ) {}
  // it will perform when user register via event-fire
  async initiateUserActivity(createUserActivityDto: CreateUserActivityDto) {
    await this.userActivityModel.create(createUserActivityDto);
    this.logger.log(
      `User activity initiated for user:'${createUserActivityDto.user}'`
    );
  }

  // rest api get activity
  async findActivityForAUser(userId: string) {
    const objectId = new Types.ObjectId(userId);
    const result = await this.userActivityModel.aggregate([
      { $match: { user: objectId } },
      {
        $project: {
          videosWatched: 1,
          minutesWatched: 1,
          likesGiven: 1,
          commentsMade: 1,
          videosUploaded: 1,
          subscribers: 1,
          watchHistory: 1,
        },
      },
      {
        $addFields: {
          watchTrend: {
            $map: {
              input: {
                $filter: {
                  input: "$watchHistory",
                  as: "history",
                  cond: { $ne: ["$$history.duration", null] },
                },
              },
              as: "entry",
              in: {
                date: {
                  $dateToString: {
                    format: "%b %d",
                    date: { $toDate: "$$entry.watchedAt" },
                  },
                },
                minutes: "$$entry.duration",
              },
            },
          },
        },
      },

      {
        $unwind: "$watchTrend",
      },
      {
        $group: {
          _id: {
            user: "$user",
            date: "$watchTrend.date",
          },
          videosWatched: { $first: "$videosWatched" },
          minutesWatched: { $first: "$minutesWatched" },
          likesGiven: { $first: "$likesGiven" },
          commentsMade: { $first: "$commentsMade" },
          videosUploaded: { $first: "$videosUploaded" },
          subscribers: { $first: "$subscribers" },
          totalMinutes: { $sum: "$watchTrend.minutes" },
        },
      },
      {
        $group: {
          _id: "$_id.user",
          videosWatched: { $first: "$videosWatched" },
          minutesWatched: { $first: "$minutesWatched" },
          likesGiven: { $first: "$likesGiven" },
          commentsMade: { $first: "$commentsMade" },
          videosUploaded: { $first: "$videosUploaded" },
          subscribers: { $first: "$subscribers" },
          watchTrend: {
            $push: {
              date: "$_id.date",
              minutes: "$totalMinutes",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          videosWatched: 1,
          minutesWatched: 1,
          likesGiven: 1,
          commentsMade: 1,
          videosUploaded: 1,
          subscribers: 1,
          watchTrend: 1,
        },
      },
    ]);
    const activity: any = result[0];
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "User activities retrieved successfully",
      data: activity
        ? { ...activity, watchTrend: orderWatchTrend(activity?.watchTrend) }
        : {},
    };
  }

  // rest api get watch history
  async getUserWatchHistory(userId: string) {
    const activity = await this.userActivityModel
      .findOne({
        user: new Types.ObjectId(userId),
      })
      .populate("watchHistory.video", "title thumbnailUrl slug views likes");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "User watch history retrieved successfully",
      data: activity?.watchHistory || [],
    };
  }

  // rest api to get all activities by admin
  async getAll() {
    const result = await this.userActivityModel
      .find({})
      .populate("user", "name");

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All the users activities retrieved successfully",
      data: result,
    };
  }

  // it will perform when user register via event-fire
  async performWatchHistory(userId: string, video: UpdateWatchHistory) {
    if (userId) {
      const durationInMinutes = calculateVideoDurationToMinutes(
        video?.duration || 0
      );
      const videoId = new Types.ObjectId(video?.videoId || "");
      const watchedAt = new Date();

      await this.userActivityModel.updateOne(
        { user: new Types.ObjectId(userId) },
        {
          $push: {
            watchHistory: {
              video: videoId,
              watchedAt,
              duration: video.duration,
            },
          },
          $inc: {
            videosWatched: 1,
            minutesWatched: durationInMinutes,
          },
        },
        { upsert: true }
      );

      this.logger.log(
        `Increment watch related history for user:${userId} and video:${video.videoId}`
      );
    } else {
      this.logger.log(`User is watching video without login`);
    }
  }

  // it will perform when user register via event-fire
  async performMultiFields(
    userId: string,
    type: "like" | "comment" | "subscribed",
    action: "increase" | "decrease"
  ) {
    const updateFieldsMap: Record<
      "like" | "comment" | "subscribed",
      "likesGiven" | "commentsMade" | "subscribers"
    > = {
      like: "likesGiven",
      comment: "commentsMade",
      subscribed: "subscribers",
    };

    const field = updateFieldsMap[type];
    const increment = action === "increase" ? 1 : -1;

    await this.userActivityModel.updateOne(
      { user: new Types.ObjectId(userId) },
      { $inc: { [field]: increment } },
      { upsert: true }
    );
    this.logger.log(
      `Increment/decrease likes/comments/subscribers for user:${userId}`
    );
  }
}
