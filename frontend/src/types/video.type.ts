import { IUser } from "./user.type";
export type IVideo = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  videoUrl: string;
  thumbnailUrl: string;
  publicId: string;
  owner: IUser;
  views: number;
  likes: string[];
  dislikes: string[];
  duration: number;
  size: number;
  createdAt: Date;
  updatedAt: Date;
};

export type IEditVideo = {
  title: string;
  description: string;
  tags: string[];
};
