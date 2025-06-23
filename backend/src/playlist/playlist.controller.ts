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
  getAllByUser(@Param("userId") userId: string) {
    return this.playlistService.getAllByUser(userId);
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.playlistService.getOne(id);
  }

  @Get("slug/:slug")
  getOneBySlug(@Param("slug") slug: string) {
    return this.playlistService.getOneBySlug(slug);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  update(@Param("id") id: string, @Body() updateDto: UpdatePlaylistDto) {
    return this.playlistService.update(id, updateDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  remove(@Param("id") id: string) {
    return this.playlistService.remove(id);
  }

  @Patch(":id/add-video")
  @UseGuards(AuthGuard)
  addVideo(
    @Param("id") playlistId: string,
    @Body() { videoId }: ModifyVideoDto
  ) {
    return this.playlistService.addVideo(playlistId, videoId);
  }

  @Patch(":id/remove-video")
  @UseGuards(AuthGuard)
  removeVideo(
    @Param("id") playlistId: string,
    @Body() { videoId }: ModifyVideoDto
  ) {
    return this.playlistService.removeVideo(playlistId, videoId);
  }
}
