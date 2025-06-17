import { Logger } from "@nestjs/common";
import { v2 as Cloudinary } from "cloudinary";

export const cloudinaryFileDelete = async (
  cloudinary: typeof Cloudinary,
  publicId: string,
  logger: Logger,
  resourceType: "image" | "video" | "raw",
  resourceName: "thumbnail" | "video" | "profile photo"
) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    if (result.result === "ok") {
      logger.log(`Successfully deleted ${resourceName}: ${publicId}`);
    } else {
      logger.warn(
        `Failed to delete ${resourceName}: ${publicId}, Cloudinary response: ${result.result}`
      );
    }
  } catch (error) {
    logger.error(
      `Error deleting ${resourceName} with publicId: ${publicId}`,
      error.stack
    );
  }
};
