import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./video.schema";
import { ChannelService } from "src/channel/channel.service";
import { ChannelModule } from "src/channel/channel.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ChannelModule,
  ],
  controllers: [VideoController],
  providers: [VideoService, ConfigService, ChannelService],
  exports: [MongooseModule, ChannelService],
})
export class VideoModule {}
