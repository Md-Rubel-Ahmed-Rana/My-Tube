import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { QueryVideoDto } from "./dto/query-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Types } from "mongoose";

@Controller("admin/videos")
export class AdminVideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  findAll(@Query() query: QueryVideoDto) {
    const { searchText, page, limit, ...filters } = query;
    return this.videoService.findAll(
      searchText,
      filters,
      Number(limit) || 10,
      Number(page) || 1
    );
  }

  @Get("stats")
  getStatsForAdmin(@Query() query: any) {
    return this.videoService.getStatsForAdmin(query);
  }

  @Get("by-status")
  getVideosByStatus(@Query("status") status: string) {
    return this.videoService.getVideosByStatus(status);
  }

  @Get("channel/:channelId")
  getOwnerVideosForChannel(@Param("channelId") channelId: Types.ObjectId) {
    return this.videoService.getOwnerVideosForChannel(channelId);
  }

  @Get(":id")
  getById(@Param("id") id: Types.ObjectId) {
    return this.videoService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: Types.ObjectId, @Body() dto: UpdateVideoDto) {
    return this.videoService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id") id: Types.ObjectId) {
    return this.videoService.remove(id);
  }

  @Patch(":id/block")
  block(@Param("id") id: Types.ObjectId) {
    return this.videoService.blockAVideo(id);
  }

  @Patch(":id/unblock")
  unblock(@Param("id") id: Types.ObjectId) {
    return this.videoService.unblockAVideo(id);
  }

  @Post("bulk-delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkDelete(@Body() body: { ids: Types.ObjectId[] }) {
    return this.videoService.bulkDelete(body.ids);
  }
}
