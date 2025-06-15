import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
  UseGuards,
  Req,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

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
}
