import { IUser } from "./user.type";
import { IVideo } from "./video.type";

export type IComment = {
  id: string;
  text: string;
  user: IUser;
  video: IVideo;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IAddComment = {
  text: string;
  video: string;
  user: string;
};

export type ICommentStats = {
  totalCount: number;
  statusDistribution: {
    count: number;
    status: string;
  }[];
  topCommenters: {
    _id: string;
    count: number;
    id: string;
    name: string;
    slug: string;
  }[];
  mostCommentedVideos: {
    _id: string;
    count: number;
    id: string;
    title: string;
    slug: string;
  }[];
};

export enum CommentStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}
