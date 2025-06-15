import { Types } from "mongoose";

export class CreateVideoDto {
  title: string;

  description: string;

  tags: string[];

  videoUrl: string;

  thumbnailUrl: string;

  publicId: string;

  owner: Types.ObjectId;

  views: number;

  likes: Types.ObjectId[];

  dislikes: Types.ObjectId[];

  duration: number;

  size: number;
}
