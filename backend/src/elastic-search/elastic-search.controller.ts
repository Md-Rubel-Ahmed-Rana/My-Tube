import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ElasticSearchService } from "./elastic-search.service";
import { CreateElasticSearchDto } from "./dto/create-elastic-search.dto";

@Controller("elastic-search")
export class ElasticSearchController {
  constructor(private readonly elasticSearchService: ElasticSearchService) {}

  @Get("create-index")
  createIndexIfNotExists() {
    return this.elasticSearchService.createIndexIfNotExists();
  }
  @Get("add-full-docs")
  addFullDbDocs() {
    return this.elasticSearchService.addFullDbDocs();
  }

  @Post()
  add(@Body() dto: CreateElasticSearchDto) {
    return this.elasticSearchService.addNewDoc(dto);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.elasticSearchService.getDoc(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: Partial<CreateElasticSearchDto>
  ) {
    return this.elasticSearchService.updateDoc(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.elasticSearchService.deleteDoc(id);
  }

  @Get()
  search(@Query("q") q: string) {
    return this.elasticSearchService.search(q);
  }
}
