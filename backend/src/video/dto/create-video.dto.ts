import { Types } from "mongoose";

export class CreateVideoDto {
  title: string;

  description: string;

  category: string;

  tags: string[];

  videoUrl: string;

  thumbnailUrl: string;

  publicId: string;

  slug: string;

  owner: Types.ObjectId;

  views: number;

  likes: Types.ObjectId[];

  dislikes: Types.ObjectId[];

  duration: number;

  size: number;

  playlistId?: string;
}
