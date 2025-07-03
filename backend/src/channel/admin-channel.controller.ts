import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  Body,
} from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { Types } from "mongoose";
import { QueryChannelDto } from "./dto/query-channel.dto";

@Controller("admin/channels")
export class AdminChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getAllChannels(@Query() query: QueryChannelDto) {
    return this.channelService.getAllChannels(query);
  }

  @Get("stats")
  async getChannelStats() {
    return this.channelService.getChannelStats();
  }

  @Get(":id")
  async getChannelById(@Param("id") id: string) {
    return this.channelService.getChannelById(id);
  }

  @Delete(":id")
  async deleteChannel(@Param("id") id: string) {
    await this.channelService.deleteChannel(id);
  }
}
