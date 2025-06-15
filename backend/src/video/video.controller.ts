import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";
import { QueryVideoDto } from "./dto/query-video.dto";

@Controller("video")
export class VideoController {
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

  @Post("upload")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("video"))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Req() req: { user: { id: string } }
  ) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    return await this.videoService.uploadVideo(file, {
      ...body,
      owner: req?.user?.id,
    });
  }

  @Get("owner")
  @UseGuards(AuthGuard)
  getOwnerVideos(@Req() req: { user: { id: string } }) {
    return this.videoService.getOwnerVideos(req?.user?.id);
  }
}
