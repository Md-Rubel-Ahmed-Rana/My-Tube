import { Module } from "@nestjs/common";
import { VideoDelete } from "./video-delete.event";
import { ConfigService } from "@nestjs/config";
import { ThumbnailDelete } from "./thumbnail-delete.event";
import { UserPhotoDelete } from "./user-photo-delete.event";
import { NewVideoUpload } from "./new-video-upload.event";
import { ElasticSearchService } from "src/elastic-search/elastic-search.service";
import { VideoService } from "src/video/video.service";
import { VideoModule } from "src/video/video.module";

@Module({
  imports: [VideoModule],
  providers: [
    VideoDelete,
    ConfigService,
    ThumbnailDelete,
    UserPhotoDelete,
    NewVideoUpload,
    ElasticSearchService,
    VideoService,
  ],
})
export class EventModule {}
