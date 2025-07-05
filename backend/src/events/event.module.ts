import { MongooseModule } from "@nestjs/mongoose";
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
import { PlaylistService } from "src/playlist/playlist.service";
import { PlaylistModule } from "src/playlist/playlist.module";
import { NewVideoUploadPlaylist } from "./new-video-upload.playlist.event";
import { UserActivityEventService } from "./user-activity.event";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [VideoModule, PlaylistModule, UserActivityModule],
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
    PlaylistService,
    NewVideoUploadPlaylist,
    UserActivityEventService,
  ],
})
export class EventModule {}
