import { Module } from "@nestjs/common";
import { VideoDelete } from "./video-delete.event";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [VideoDelete, ConfigService],
})
export class EventModule {}
