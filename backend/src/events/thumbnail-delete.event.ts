import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OnEvent } from "@nestjs/event-emitter";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class ThumbnailDelete {
  private readonly logger = new Logger(ThumbnailDelete.name);

  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  @OnEvent("thumbnail.deleted")
  async handleThumbnailDeletedEvent(publicId: string) {
    this.logger.log(
      `Attempting to delete thumbnail with publicId: ${publicId}`
    );

    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });

      if (result.result === "ok") {
        this.logger.log(`Successfully deleted thumbnail: ${publicId}`);
      } else {
        this.logger.warn(
          `Failed to delete thumbnail: ${publicId}, Cloudinary response: ${result.result}`
        );
      }
    } catch (error) {
      this.logger.error(
        `Error deleting thumbnail with publicId: ${publicId}`,
        error.stack
      );
    }
  }
}
