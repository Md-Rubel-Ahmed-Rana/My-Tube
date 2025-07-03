import { Controller, Get, Delete, Query } from "@nestjs/common";
import { ElasticSearchService } from "./elastic-search.service";

@Controller("elastic-search")
export class ElasticSearchController {
  constructor(private readonly elasticSearchService: ElasticSearchService) {}

  @Get()
  search(@Query("q") q: string) {
    return this.elasticSearchService.search(q);
  }

  @Get("all")
  getAllDocs(@Query("limit") limit: number, @Query("page") page: number) {
    return this.elasticSearchService.getAllDocs(page, limit);
  }

  @Get("create-index")
  createIndexIfNotExists() {
    return this.elasticSearchService.createIndexIfNotExists();
  }
  @Get("add-full-docs")
  addFullDbDocs() {
    return this.elasticSearchService.addFullDbDocs();
  }

  @Delete("all")
  deleteAllDocs() {
    return this.elasticSearchService.deleteAllDocs();
  }
}
