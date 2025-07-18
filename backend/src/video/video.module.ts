import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./video.schema";
import { ChannelService } from "src/channel/channel.service";
import { ChannelModule } from "src/channel/channel.module";
import { AdminVideoController } from "./admin-video.controller";
import { SocketIoService } from "src/socket/socket-io.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ChannelModule,
  ],
  controllers: [VideoController, AdminVideoController],
  providers: [VideoService, ConfigService, ChannelService, SocketIoService],
  exports: [MongooseModule, ChannelService, SocketIoService],
})
export class VideoModule {}
