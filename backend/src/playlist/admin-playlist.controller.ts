import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  Body,
} from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { Types } from "mongoose";
import { QueryPlaylistDto } from "./dto/query-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";

@Controller("admin/playlists")
export class AdminPlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  async getAll(@Query() query: QueryPlaylistDto) {
    return this.playlistService.findAll(query);
  }

  @Get("stats")
  async getPlayListsStats() {
    return this.playlistService.getPlayListsStats();
  }

  @Get(":id")
  async getOne(@Param("id") id: string) {
    return this.playlistService.getOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateDto: UpdatePlaylistDto) {
    return this.playlistService.updatePlaylist(
      new Types.ObjectId(id),
      updateDto
    );
  }

  @Patch(":id/block")
  async block(@Param("id") id: string) {
    return this.playlistService.blockPlaylist(new Types.ObjectId(id));
  }

  @Patch(":id/unblock")
  async unblockPlaylist(@Param("id") id: string) {
    return this.playlistService.unblockPlaylist(new Types.ObjectId(id));
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.playlistService.remove(id);
  }
}
