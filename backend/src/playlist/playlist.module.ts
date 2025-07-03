import { Module } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Playlist, PlaylistSchema } from "./playlist.schema";
import { ConfigService } from "@nestjs/config";
import { AdminPlaylistController } from "./admin-playlist.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  controllers: [PlaylistController, AdminPlaylistController],
  providers: [PlaylistService, ConfigService],
  exports: [MongooseModule],
})
export class PlaylistModule {}
