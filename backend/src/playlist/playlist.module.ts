import { Module } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Playlist, PlaylistSchema } from "./playlist.schema";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, ConfigService],
})
export class PlaylistModule {}
