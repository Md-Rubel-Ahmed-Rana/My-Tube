import { Module } from "@nestjs/common";
import { VideoDelete } from "./video-delete.event";
import { ConfigService } from "@nestjs/config";
import { ThumbnailDelete } from "./thumbnail-delete.event";
import { UserPhotoDelete } from "./user-photo-delete.event";

@Module({
  providers: [VideoDelete, ConfigService, ThumbnailDelete, UserPhotoDelete],
})
export class EventModule {}
