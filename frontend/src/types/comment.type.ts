import { IUser } from "./user.type";

export type IComment = {
  id: string;
  text: string;
  user: IUser;
  video: { id: string; title: string };
  createdAt: Date;
  updatedAt: Date;
};

export type IAddComment = {
  text: string;
  video: string;
  user: string;
};
