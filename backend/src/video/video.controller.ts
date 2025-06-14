import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("video"))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log({ body });
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    return await this.videoService.uploadVideo(file);
  }
}
