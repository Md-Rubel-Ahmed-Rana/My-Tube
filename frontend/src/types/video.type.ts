import { IUser } from "./user.type";
export type IVideo = {
  id: string;
  title: string;
  description: string;
  slug: string;
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

export type IVideoStats = {
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
  totalDislikes: number;
  totalSize: number;
  videosByStatus: {
    [key: string]: number;
  };
};
