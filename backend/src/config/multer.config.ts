import { diskStorage } from "multer";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

const uploadPath = join(__dirname, "../../uploads/videos");

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

export const videoUploadConfig: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = file.originalname.split(".").pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "video" && file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else if (
      file.fieldname === "thumbnail" &&
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only video and image files are allowed!") as any, false);
    }
  },
};
