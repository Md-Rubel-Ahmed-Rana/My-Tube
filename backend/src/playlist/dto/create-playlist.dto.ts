import { Types } from "mongoose";
export class CreatePlaylistDto {
  name: string;
  user: Types.ObjectId;
}
