import { Controller, Get, Query } from "@nestjs/common";
import { VideoService } from "./video.service";
import { QueryVideoDto } from "./dto/query-video.dto";

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
}
