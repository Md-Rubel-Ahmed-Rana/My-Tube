import { Module } from "@nestjs/common";
import { ElasticSearchService } from "./elastic-search.service";
import { ElasticSearchController } from "./elastic-search.controller";
import { ConfigService } from "@nestjs/config";
import { VideoService } from "src/video/video.service";
import { VideoModule } from "src/video/video.module";

@Module({
  imports: [VideoModule],
  controllers: [ElasticSearchController],
  providers: [ElasticSearchService, ConfigService, VideoService],
})
export class ElasticSearchModule {}
