import { IVideo } from "./video.type";

export type IPlaylist = {
  id: string;
  name: string;
  slug: string;
  videos: IVideo[];
  createdAt: Date;
  updatedAt: Date;
};
