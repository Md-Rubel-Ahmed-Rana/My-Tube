import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateElasticSearchDto } from "src/elastic-search/dto/create-elastic-search.dto";
import { ElasticSearchService } from "src/elastic-search/elastic-search.service";

@Injectable()
export class NewVideoUpload {
  private readonly logger = new Logger(NewVideoUpload.name);

  constructor(private readonly elasticService: ElasticSearchService) {}

  @OnEvent("new-video-upload.created")
  async handleNewVideoUploadEvent(doc: CreateElasticSearchDto) {
    this.logger.log(
      `Attempting to add video/doc to Elastic search with title: ${doc?.title}`
    );
    this.elasticService.addNewDoc(doc);
  }
}
