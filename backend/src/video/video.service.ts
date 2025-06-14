import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

@Injectable()
export class VideoService {
  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  async uploadVideo(file: Express.Multer.File) {
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
        (error, result) => {
          if (error) return reject(error);

          const metadata = {
            public_id: result.public_id,
            url: result.secure_url,
            duration: result.duration,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            created_at: result.created_at,
            tags: result.tags,
            original_filename: result.original_filename,
            bitrate: result.bits,
            frame_rate: result.frame_rate,
          };

          return resolve({
            statusCode: HttpStatus.OK,
            success: true,
            message: "Your video uploaded successfully",
            data: metadata,
          });
        }
      );
      const readable = Readable.from(file.buffer);
      readable.pipe(uploadStream);
    });
  }
}
