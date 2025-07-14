import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { ModifyVideoDto } from "./dto/modify-video.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ReorderPlaylistDto } from "./dto/reorder-playlist.dto";
import { ValidateObjectIdPipe } from "src/validations/validate-object-id.pipe";
import { Types } from "mongoose";

@Controller("playlist")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Req() req: { user: { id: string } },
    @Body() createPlaylistDto: CreatePlaylistDto
  ) {
    return this.playlistService.create({
      ...createPlaylistDto,
      user: req?.user?.id,
    });
  }

  @Get("user/:userId")
  @UseGuards(AuthGuard)
  getAllByUser(@Param("userId", ValidateObjectIdPipe) userId: string) {
    return this.playlistService.getAllByUser(userId);
  }

  @Get("public/:userId")
  @UseGuards(AuthGuard)
  getChannelPublicPlaylists(
    @Param("userId", ValidateObjectIdPipe) userId: string
  ) {
    return this.playlistService.getChannelPublicPlaylists(userId);
  }

  @Get(":id")
  getOne(@Param("id", ValidateObjectIdPipe) id: string) {
    return this.playlistService.getOne(id);
  }

  @Get("slug/:slug")
  getOneBySlug(@Param("slug") slug: string) {
    return this.playlistService.getOneBySlug(slug);
  }

  @Patch(":id/reorder")
  reorder(
    @Param("id", ValidateObjectIdPipe) playlistId: string,
    @Body() { videoIds }: ReorderPlaylistDto
  ) {
    return this.playlistService.reorderVideos(playlistId, videoIds);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  update(
    @Param("id", ValidateObjectIdPipe) id: string,
    @Body() updateDto: UpdatePlaylistDto
  ) {
    return this.playlistService.update(id, updateDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  remove(@Param("id", ValidateObjectIdPipe) id: string) {
    return this.playlistService.remove(id);
  }

  @Patch(":id/add-video")
  @UseGuards(AuthGuard)
  addVideo(
    @Param("id", ValidateObjectIdPipe) playlistId: string,
    @Body() { videoId }: ModifyVideoDto
  ) {
    return this.playlistService.addVideo(playlistId, videoId);
  }

  @Patch(":id/remove-video")
  @UseGuards(AuthGuard)
  removeVideo(
    @Param("id", ValidateObjectIdPipe) playlistId: string,
    @Body() { videoId }: ModifyVideoDto
  ) {
    return this.playlistService.removeVideo(playlistId, videoId);
  }
  @Patch(":id/status")
  @UseGuards(AuthGuard)
  updatePlaylistStatus(
    @Param("id", ValidateObjectIdPipe) playlistId: Types.ObjectId,
    @Body() { status }: UpdatePlaylistDto
  ) {
    return this.playlistService.updatePlaylistStatus(playlistId, status);
  }
}
