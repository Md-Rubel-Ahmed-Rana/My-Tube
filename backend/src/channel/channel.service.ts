import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Channel } from "./channel.schema";
import { Model, Types } from "mongoose";
import { QueryChannelDto } from "./dto/query-channel.dto";
import { TypedEventEmitter } from "src/core/typed-event-emitter.service";

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
    private readonly emitter: TypedEventEmitter
  ) {}

  async subscribe(data: CreateChannelDto) {
    const isExist = await this.channelModel.findOne({ user: data.user });
    if (isExist) {
      await this.channelModel.findOneAndUpdate(
        { user: data.user },
        { $addToSet: { channels: data.channel } }
      );
    } else {
      await this.channelModel.create({
        user: data.user,
        channels: [data.channel],
      });
    }

    // fire event to increase subscribers on user activity
    this.emitter.emit("user-activity-like-comment-subscribe", {
      userId: data?.channel,
      type: "subscribed",
      action: "increase",
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Channel subscribed successfully",
      data: null,
    };
  }

  async unsubscribe(data: CreateChannelDto) {
    await this.channelModel.findOneAndUpdate(
      { user: data.user },
      { $pull: { channels: data.channel } }
    );

    // fire event to increase subscribers on user activity
    this.emitter.emit("user-activity-like-comment-subscribe", {
      userId: data?.channel,
      type: "subscribed",
      action: "decrease",
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Channel unsubscribed successfully",
      data: null,
    };
  }

  async getTotalSubscriptions(channelId: string): Promise<number> {
    const result = await this.channelModel.find({
      channels: new Types.ObjectId(channelId),
    });
    return result?.length || 0;
  }

  async isSubscribed(userId: string, channelId: string) {
    const result = await this.channelModel
      .findOne({
        user: new Types.ObjectId(userId),
        channels: new Types.ObjectId(channelId),
      })
      .lean();

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: result ? "Channel is subscribed" : "Channel is not subscribed",
      data: result,
    };
  }

  async getChannels(userId: string) {
    const result = await this.channelModel
      .findOne({ user: userId })
      .populate([
        {
          path: "channels",
          select: "-password",
        },
        {
          path: "user",
          select: "-password",
        },
      ])
      .lean();

    const sortedChannels: any =
      result?.channels?.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      ) || [];

    const channelsWithSubscriptions = await Promise.all(
      sortedChannels.map(async (channel: any) => {
        const subscriptions = await this.getTotalSubscriptions(channel._id);

        return { ...channel, subscriptions, id: channel?._id };
      })
    );

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Fetched user channels",
      data: channelsWithSubscriptions,
    };
  }

  async findAll() {
    const results = await this.channelModel
      .find()
      .populate([
        {
          path: "channels",
          select: "-password",
        },
        {
          path: "user",
          select: "-password",
        },
      ])
      .lean();
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All channel subscriptions fetched",
      data: results,
    };
  }

  async getAllChannels(queries: QueryChannelDto) {
    const { searchQuery, page = 1, limit = 10 } = queries;

    const filter: any = {};

    if (searchQuery) {
      filter.$or = [
        { "user.username": { $regex: searchQuery, $options: "i" } },
        { "user.email": { $regex: searchQuery, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const channels = await this.channelModel
      .find(filter)
      .populate("user", "username email slug")
      .populate("channels", "username email slug")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    const total = await this.channelModel.countDocuments(filter);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All channels retrieved",
      data: channels,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total,
      },
    };
  }

  async getChannelById(id: string) {
    const channel = await this.channelModel
      .findById(id)
      .populate("user", "username email slug")
      .populate("channels", "username email slug");

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All channel subscriptions fetched",
      data: channel,
    };
  }

  async deleteChannel(id: string) {
    await this.channelModel.findByIdAndDelete(id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Channel deleted successfully",
      data: null,
    };
  }

  async getChannelStats() {
    const totalChannels = await this.channelModel.countDocuments();

    const totalSubscribers = await this.channelModel.aggregate([
      {
        $project: {
          subscriberCount: { $size: "$channels" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$subscriberCount" },
        },
      },
    ]);

    const topChannels = await this.channelModel.aggregate([
      {
        $project: {
          user: 1,
          subscriberCount: { $size: "$channels" },
        },
      },
      {
        $sort: { subscriberCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `Channels analytics retrieved  successfully`,
      data: {
        totalChannels,
        totalSubscribers: totalSubscribers[0]?.total || 0,
        topChannels,
      },
    };
  }

  async getTopChannels() {
    const topChannels = await this.channelModel.aggregate([
      { $unwind: "$channels" },
      {
        $group: {
          _id: "$channels",
          subscriberCount: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "owner",
          as: "videos",
        },
      },
      {
        $addFields: {
          videoCount: { $size: "$videos" },
        },
      },

      {
        $lookup: {
          from: "comments",
          let: { videoIds: "$videos._id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$video", "$$videoIds"] },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" },
        },
      },
      {
        $addFields: {
          score: {
            $add: [
              "$subscriberCount",
              { $multiply: ["$videoCount", 2] },
              { $multiply: ["$commentCount", 0.5] },
            ],
          },
        },
      },

      { $sort: { score: -1 } },
      { $limit: 10 },
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
          _id: 0,
          id: "$_id",
          username: "$user.username",
          email: "$user.email",
          name: "$user.name",
          photo: "$user.photo",
          slug: "$user.slug",
          subscriberCount: 1,
          videoCount: 1,
          commentCount: 1,
          score: 1,
        },
      },
    ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `Top channels retrieved  successfully`,
      data: topChannels,
    };
  }
}
