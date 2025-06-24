import { Types } from "mongoose";

export class GetUserDto {
  id: Types.ObjectId;
  name: string;
  username: string;
  slug: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}
