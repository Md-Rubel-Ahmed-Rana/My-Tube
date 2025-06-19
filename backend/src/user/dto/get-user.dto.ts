import { Types } from "mongoose";

export class GetUserDto {
  id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}
