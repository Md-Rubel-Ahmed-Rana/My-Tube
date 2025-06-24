import { Injectable } from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Channel } from "./channel.schema";
import { Model } from "mongoose";

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>
  ) {}

  async create(data: CreateChannelDto) {
    const isExist = await this.channelModel.findOne({ user: data.user });
    if (isExist) {
      return this.subscribe(data);
    }

    await this.channelModel.create({
      user: data.user,
      channels: [data.channel],
    });

    return {
      statusCode: 200,
      success: true,
      message: "Channel subscribed successfully",
      data: null,
    };
  }

  async subscribe(data: CreateChannelDto) {
    await this.channelModel.findOneAndUpdate(
      { user: data.user },
      { $addToSet: { channels: data.channel } }
    );
    return {
      statusCode: 200,
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
    return {
      statusCode: 200,
      success: true,
      message: "Channel unsubscribed successfully",
      data: null,
    };
  }

  async isSubscribed(userId: string, channelId: string) {
    const result = await this.channelModel
      .findOne({
        user: userId,
        channels: channelId,
      })
      .lean();

    return {
      statusCode: 200,
      success: true,
      message: result ? "Channel is subscribed" : "Channel is not subscribed",
      data: { isSubscribed: !!result },
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

    return {
      statusCode: 200,
      success: true,
      message: "Fetched user channels",
      data: result?.channels || [],
    };
  }

  async findAll() {
    const results = await this.channelModel.find().lean();
    return {
      statusCode: 200,
      success: true,
      message: "All channel subscriptions fetched",
      data: results,
    };
  }
}
