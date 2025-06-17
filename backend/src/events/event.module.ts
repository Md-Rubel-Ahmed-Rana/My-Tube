import { Module } from "@nestjs/common";
import { VideoDelete } from "./video-delete.event";
import { ConfigService } from "@nestjs/config";
import { ThumbnailDelete } from "./thumbnail-delete.event";

@Module({
  providers: [VideoDelete, ConfigService, ThumbnailDelete],
})
export class EventModule {}
