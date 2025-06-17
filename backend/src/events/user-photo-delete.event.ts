import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OnEvent } from "@nestjs/event-emitter";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryFileDelete } from "src/utils/cloudinaryFileDelete";

@Injectable()
export class UserPhotoDelete {
  private readonly logger = new Logger(UserPhotoDelete.name);

  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  @OnEvent("user-photo.deleted")
  async handleUserPhotoDeletedEvent(publicId: string) {
    this.logger.log(
      `Attempting to delete profile photo with publicId: ${publicId}`
    );

    cloudinaryFileDelete(
      cloudinary,
      publicId,
      this.logger,
      "image",
      "profile photo"
    );
  }
}
