import { Module } from "@nestjs/common";
import { VideoDeleteCloudinary } from "./video-delete-cloudinary.event";
import { ConfigService } from "@nestjs/config";
import { ThumbnailDelete } from "./thumbnail-delete.event";
import { UserPhotoDelete } from "./user-photo-delete.event";
import { NewVideoUpload } from "./new-video-upload.elastic.event";
import { ElasticSearchService } from "src/elastic-search/elastic-search.service";
import { VideoService } from "src/video/video.service";
import { VideoModule } from "src/video/video.module";
import { VideoDeleteElasticSearch } from "./video-deleted-elastic-search.event";
import { VideoUpdateElastic } from "./video-update.elastic.event";

@Module({
  imports: [VideoModule],
  providers: [
    VideoDeleteCloudinary,
    ConfigService,
    ThumbnailDelete,
    UserPhotoDelete,
    NewVideoUpload,
    ElasticSearchService,
    VideoService,
    VideoDeleteElasticSearch,
    VideoUpdateElastic,
  ],
})
export class EventModule {}
