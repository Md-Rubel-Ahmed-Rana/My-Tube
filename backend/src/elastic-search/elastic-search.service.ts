import { HttpStatus, Injectable } from "@nestjs/common";
import { Client } from "@elastic/elasticsearch";
import { CreateElasticSearchDto } from "./dto/create-elastic-search.dto";
import { ConfigService } from "@nestjs/config";
import { VideoService } from "src/video/video.service";
import { Types } from "mongoose";

@Injectable()
export class ElasticSearchService {
  private client: Client;
  private index = "my-tube-videos";

  constructor(
    private config: ConfigService,
    private readonly videoService: VideoService
  ) {
    this.client = new Client({
      node: this.config.get<string>("ELASTIC_SEARCH_URL"),
      auth: {
        apiKey: this.config.get<string>("ELASTIC_SEARCH_API_KEY"),
      },
    });

    this.createIndexIfNotExists();
  }

  async createIndexIfNotExists() {
    const exists = await this.client.indices.exists({ index: this.index });

    if (!exists) {
      await this.client.indices.create({
        index: this.index,
        body: {
          mappings: {
            properties: {
              title: { type: "text" },
              description: { type: "text" },
              tags: { type: "text" },
            },
          },
        } as any,
      });
    }

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Elastic Search index created successfully!",
      data: null,
    };
  }

  async addFullDbDocs() {
    const docs: CreateElasticSearchDto[] =
      await this.videoService.getElasticVideoDocs();

    console.log({ from: "Elastic service", videos: docs });

    const response = await this.client.helpers.bulk({
      index: this.index,
      datasource: docs,
      onDocument(doc) {
        return {
          index: { _id: doc.id },
        };
      },
      refreshOnCompletion: true,
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `All the videos ${docs?.length || 0} added to Elastic Search`,
      data: response,
    };
  }

  async addNewDoc(doc: CreateElasticSearchDto) {
    const response = await this.client.index({
      index: this.index,
      id: doc.id,
      document: {
        title: doc.title,
        description: doc.description,
        tags: doc.tags,
      },
    });
    return response;
  }

  async getDoc(id: string) {
    const response = await this.client.get({
      index: this.index,
      id,
    });
    return response._source;
  }

  async updateDoc(id: string, doc: Partial<CreateElasticSearchDto>) {
    const response = await this.client.update({
      index: this.index,
      id,
      doc,
    });
    return response;
  }

  async deleteDoc(id: string) {
    const response = await this.client.delete({
      index: this.index,
      id,
    });
    return response;
  }

  async search(keyword: string) {
    // hit elastic search to match search query
    const response = await this.client.search({
      index: this.index,
      query: {
        multi_match: {
          query: keyword,
          fields: ["title", "description", "tags"],
        },
      },
    });

    // Now, we have to find videos from DB with matching IDs.
    // coz, elastic search has only title, description, and tags property.
    // but each video has a lot of properties that ES does not need to search/index video
    const videoIds = response.hits.hits.map(
      (video: any) => new Types.ObjectId(video._source?.id as string)
    );

    const videos = await this.videoService.getVideosByIds(videoIds);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Videos search results found!",
      data: videos,
    };
  }
}
