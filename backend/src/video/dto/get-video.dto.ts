import { Types } from "mongoose";
import { GetUserDto } from "src/user/dto/get-user.dto";

export class GetVideoDto {
  id: Types.ObjectId;

  title: string;

  description: string;

  videoUrl: string;

  thumbnailUrl: string;

  publicId: string;

  owner: GetUserDto;

  views: number;

  likes: Types.ObjectId[];

  dislikes: Types.ObjectId[];

  tags: string[];

  duration: number;

  size: number;

  createdAt: Date;

  updatedAt: Date;
}
