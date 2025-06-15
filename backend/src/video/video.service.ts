import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { CreateVideoDto } from "./dto/create-video.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Video } from "./video.schema";
import { Model, Types } from "mongoose";
import { parseField } from "src/utils/parseField";

@Injectable()
export class VideoService {
  constructor(
    private config: ConfigService,
    @InjectModel(Video.name) private videoModel: Model<Video>
  ) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  async uploadVideo(file: Express.Multer.File, body: CreateVideoDto) {
    if (!file) {
      throw new HttpException("File is missing", HttpStatus.BAD_REQUEST);
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          chunk_size: 6000000,
          folder: "my-tube/videos",
        },
        async (error, result) => {
          if (error) return reject(error);

          const newVideoData: CreateVideoDto = {
            publicId: result.public_id,
            videoUrl: result.secure_url,
            thumbnailUrl: cloudinary.url(result.public_id, {
              resource_type: "video",
              format: "jpg",
              secure: true,
            }),
            duration: result.duration,
            size: result.bytes,
            tags: parseField(body?.tags),
            title: body.title,
            description: body.description,
            dislikes: [],
            likes: [],
            views: 0,
            owner: new Types.ObjectId(body.owner),
          };

          await this.newVideo(newVideoData);

          return resolve({
            statusCode: HttpStatus.OK,
            success: true,
            message: "Your video uploaded successfully",
            data: null,
          });
        }
      );
      const readable = Readable.from(file.buffer);
      readable.pipe(uploadStream);
    });
  }

  async newVideo(createNewVideoDto: CreateVideoDto) {
    return this.videoModel.create(createNewVideoDto);
  }
}
