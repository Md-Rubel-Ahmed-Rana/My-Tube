import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Client } from "@elastic/elasticsearch";
import { CreateElasticSearchDto } from "./dto/create-elastic-search.dto";
import { ConfigService } from "@nestjs/config";
import { VideoService } from "src/video/video.service";
import { Types } from "mongoose";

@Injectable()
export class ElasticSearchService {
  private client: Client;
  private index = "my-tube-videos";
  private readonly logger = new Logger(ElasticSearchService.name);

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

    this.logger.log("ElasticSearch client initialized.");
    this.createIndexIfNotExists();
  }

  async createIndexIfNotExists() {
    const exists = await this.client.indices.exists({ index: this.index });

    if (!exists) {
      this.logger.warn(`Index '${this.index}' does not exist. Creating now...`);
      await this.client.indices.create({
        index: this.index,
        body: {
          settings: {
            analysis: {
              filter: {
                edge_ngram_filter: {
                  type: "edge_ngram",
                  min_gram: 2,
                  max_gram: 20,
                },
              },
              analyzer: {
                edge_ngram_analyzer: {
                  tokenizer: "standard",
                  filter: ["lowercase", "edge_ngram_filter"],
                },
                lowercase_analyzer: {
                  tokenizer: "standard",
                  filter: ["lowercase"],
                },
              },
            },
          },
          mappings: {
            properties: {
              id: { type: "keyword" },
              title: {
                type: "text",
                analyzer: "edge_ngram_analyzer",
                search_analyzer: "lowercase_analyzer",
              },
              channel: {
                type: "text",
                analyzer: "edge_ngram_analyzer",
                search_analyzer: "lowercase_analyzer",
              },
              description: {
                type: "text",
                analyzer: "edge_ngram_analyzer",
                search_analyzer: "lowercase_analyzer",
              },
              tags: {
                type: "text",
                analyzer: "edge_ngram_analyzer",
                search_analyzer: "lowercase_analyzer",
              },
            },
          },
        } as Record<string, any>,
      });

      this.logger.log(`Index '${this.index}' created successfully.`);
    } else {
      this.logger.log(`Index '${this.index}' already exists.`);
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

    this.logger.log(
      `Fetched ${docs.length} documents from database for indexing.`
    );

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

    this.logger.log(`Bulk indexing completed. Indexed ${docs.length} videos.`);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `All the videos ${docs?.length || 0} added to Elastic Search`,
      data: response,
    };
  }

  async addNewDoc(doc: CreateElasticSearchDto) {
    this.logger.log(`Indexing new document with ID: ${doc.id}`);

    await this.client.index({
      index: this.index,
      id: doc.id,
      document: {
        id: doc.id,
        title: doc.title || "",
        description: doc.description || "",
        tags: doc.tags || [],
        channel: doc?.channel || "",
      },
    });

    this.logger.log(`Document with ID ${doc.id} indexed successfully.`);
  }

  async getDoc(id: string) {
    this.logger.log(`Retrieving document with ID: ${id}`);
    const response = await this.client.get({
      index: this.index,
      id,
    });
    this.logger.log(`Document with ID ${id} retrieved.`);
    return response._source;
  }

  async getAllDocs(page = 1, limit = 10) {
    const from = (page - 1) * limit;

    const response: any = await this.client.search({
      index: this.index,
      body: {
        from,
        size: limit,
        query: {
          match_all: {},
        },
      } as Record<string, any>,
    });

    const docs = response.hits.hits.map((hit) => hit._source);
    this.logger.log(`Fetched ${docs.length} documents (Page: ${page}).`);

    return {
      statusCode: HttpStatus.OK,
      message: "Docs retrieved from Elasticsearch",
      success: true,
      data: docs,
      pagination: {
        page,
        limit,
        total: response.hits.total.value as number,
      },
    };
  }

  async updateDoc(id: string, doc: Partial<CreateElasticSearchDto>) {
    this.logger.log(`Updating document with ID: ${id}`);
    await this.client.update({
      index: this.index,
      id,
      doc,
    });
    this.logger.log(`Document with ID ${id} updated.`);
  }

  async deleteDoc(id: string) {
    this.logger.log(`Deleting document with ID: ${id}`);
    const response = await this.client.delete({
      index: this.index,
      id,
    });
    this.logger.log(`Document with ID ${id} deleted.`);
    return response;
  }

  async deleteAllDocs() {
    this.logger.warn(`Deleting ALL documents from index '${this.index}'`);
    const response = await this.client.deleteByQuery({
      index: this.index,
      query: {
        match_all: {},
      },
      refresh: true,
    });

    this.logger.log(
      `All documents from index '${this.index}' deleted successfully.`
    );

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "All video docs deleted from Elasticsearch.",
      data: response,
    };
  }

  async search(keyword: string) {
    this.logger.log(`Searching videos with keyword: '${keyword}'`);

    const response = await this.client.search({
      index: this.index,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: keyword,
                fields: ["title^5", "tags^3", "description", "channel"],
                fuzziness: "AUTO",
              },
            },
            {
              wildcard: {
                title: {
                  value: `*${keyword.toLowerCase()}*`,
                  boost: 0.3,
                },
              },
            },
          ],
        },
      },
    });

    const hits = response.hits.hits;
    this.logger.log(`Search query returned ${hits.length} hits.`);

    const videoIds = hits.map((video: any) => {
      return new Types.ObjectId((video?._id || video?._source?.id) as string);
    });

    this.logger.log(
      `Fetching full video data from DB for ${videoIds.length} IDs.`
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
