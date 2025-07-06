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
