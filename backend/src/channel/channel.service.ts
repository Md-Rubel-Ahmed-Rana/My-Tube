import { Injectable } from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Channel } from "./channel.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>
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
    console.log({ userId, channelId });
    const result = await this.channelModel
      .findOne({
        user: new Types.ObjectId(userId),
        channels: new Types.ObjectId(channelId),
      })
      .lean();

    return {
      statusCode: 200,
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

    const sortedChannels =
      result?.channels?.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      ) || [];

    return {
      statusCode: 200,
      success: true,
      message: "Fetched user channels",
      data: sortedChannels,
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
      statusCode: 200,
      success: true,
      message: "All channel subscriptions fetched",
      data: results,
    };
  }
}
