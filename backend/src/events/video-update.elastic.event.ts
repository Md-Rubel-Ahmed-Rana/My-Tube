import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateElasticSearchDto } from "src/elastic-search/dto/create-elastic-search.dto";
import { ElasticSearchService } from "src/elastic-search/elastic-search.service";

@Injectable()
export class VideoUpdateElastic {
  private readonly logger = new Logger(VideoUpdateElastic.name);

  constructor(private readonly elasticService: ElasticSearchService) {}

  @OnEvent("video-update-elastic.updated")
  async handleVideoUpdateEvent(doc: CreateElasticSearchDto) {
    this.logger.log(
      `Attempting to update video/doc to Elastic search with title: ${doc?.title}`
    );
    this.elasticService.updateDoc(doc.id, doc);
  }
}
