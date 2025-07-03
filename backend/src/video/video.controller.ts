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
  Param,
  Patch,
  Delete,
  UploadedFiles,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";
import { QueryVideoDto } from "./dto/query-video.dto";
import { Types } from "mongoose";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { PublicAuthGuard } from "src/auth/public-auth.guard";

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

  @Get("feed")
  @UseGuards(PublicAuthGuard)
  getHomepageFeed(@Req() req: { user: { id: string } }) {
    return this.videoService.performBestVideosQuery(req?.user?.id);
  }

  @Get("search")
  searchVideo(@Query() query: QueryVideoDto) {
    const { searchText } = query;
    return this.videoService.searchVideo(searchText);
  }

  @Get("stats")
  @UseGuards(AuthGuard)
  stats(@Req() req: { user: { id: Types.ObjectId } }) {
    return this.videoService.getStatsForVideoOwner(req.user.id);
  }

  @Get("status")
  @UseGuards(AuthGuard)
  getVideosByStatus(@Param("status") status: string) {
    return this.videoService.getVideosByStatus(status);
  }

  @Get(":id/related-videos")
  relatedVideos(@Param("id") id: Types.ObjectId) {
    return this.videoService.relatedVideos(id);
  }

  @Get("channel/:id")
  getOwnerVideosForChannel(@Param("id") id: Types.ObjectId) {
    return this.videoService.getOwnerVideosForChannel(id);
  }

  @Post("upload")
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ])
  )
  async upload(
    @UploadedFiles()
    files: {
      video?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
    @Body() body,
    @Req() req: { user: { id: string } }
  ) {
    const videoFile = files.video?.[0];
    const thumbnailFile = files.thumbnail?.[0];

    if (!videoFile) {
      throw new BadRequestException("Video is required");
    }

    return await this.videoService.create(videoFile, thumbnailFile, {
      ...body,
      owner: req.user.id,
    });
  }

  @Get("owner")
  @UseGuards(AuthGuard)
  getOwnerVideos(@Req() req: { user: { id: string } }) {
    return this.videoService.getOwnerVideos(req?.user?.id);
  }

  @Get(":id")
  findOne(@Param("id") id: Types.ObjectId) {
    return this.videoService.findOne(id);
  }

  @Get("slug/:slug")
  findOneBySlug(@Param("slug") slug: string) {
    return this.videoService.findOneBySlug(slug);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  update(@Param("id") id: Types.ObjectId, @Body() body: UpdateVideoDto) {
    return this.videoService.update(id, body);
  }

  @Patch(":id/views")
  incrementViews(@Param("id") id: Types.ObjectId) {
    return this.videoService.incrementViews(id);
  }

  @Patch(":id/like")
  @UseGuards(AuthGuard)
  likeVideo(
    @Param("id") id: Types.ObjectId,
    @Req() req: { user: { id: Types.ObjectId } }
  ) {
    return this.videoService.likeVideo(id, req?.user?.id);
  }

  @Patch(":id/dislike")
  @UseGuards(AuthGuard)
  dislikeVideo(
    @Param("id") id: Types.ObjectId,
    @Req() req: { user: { id: Types.ObjectId } }
  ) {
    return this.videoService.dislikeVideo(id, req.user.id);
  }

  @Delete(":id")
  remove(@Param("id") id: Types.ObjectId) {
    return this.videoService.remove(id);
  }

  @Patch(":id/thumbnail")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("thumbnail"))
  updateProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: Types.ObjectId
  ) {
    return this.videoService.updateVideoThumbnail(id, file);
  }
}
