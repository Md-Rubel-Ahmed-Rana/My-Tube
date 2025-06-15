import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OnEvent } from "@nestjs/event-emitter";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class VideoDelete {
  private readonly logger = new Logger(VideoDelete.name);

  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  @OnEvent("video.deleted")
  async handleVideoDeletedEvent(publicId: string) {
    this.logger.log(`Attempting to delete video with publicId: ${publicId}`);

    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });

      if (result.result === "ok") {
        this.logger.log(`Successfully deleted video: ${publicId}`);
      } else {
        this.logger.warn(
          `Failed to delete video: ${publicId}, Cloudinary response: ${result.result}`
        );
      }
    } catch (error) {
      this.logger.error(
        `Error deleting video with publicId: ${publicId}`,
        error.stack
      );
    }
  }
}
