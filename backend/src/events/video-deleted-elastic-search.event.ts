import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ElasticSearchService } from "src/elastic-search/elastic-search.service";

@Injectable()
export class VideoDeleteElasticSearch {
  private readonly logger = new Logger(VideoDeleteElasticSearch.name);

  constructor(private readonly elasticService: ElasticSearchService) {}

  @OnEvent("video-elastic.deleted")
  async handleNewVideoUploadEvent(doc: { title: string; id: string }) {
    this.logger.log(
      `Attempting to delete video/doc from Elastic search with title: ${doc?.title}`
    );
    this.elasticService.deleteDoc(doc?.id);
  }
}
