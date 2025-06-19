import { Types } from "mongoose";

export class CreateCommentDto {
  text: string;
  user: Types.ObjectId;
  video: Types.ObjectId;
}
