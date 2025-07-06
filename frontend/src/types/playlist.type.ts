import { IUser } from "./user.type";
import { IVideo } from "./video.type";

export type IPlaylist = {
  id: string;
  name: string;
  slug: string;
  status: PlaylistStatus;
  videoCount: number;
  user: IUser;
  videos: IVideo[];
  createdAt: Date;
  updatedAt: Date;
};

export enum PlaylistStatus {
  PUBLIC = "public",
  PRIVATE = "private",
  BLOCKED = "blocked",
  DELETED = "deleted",
}

export const PLAYLIST_STATUSES = ["public", "blocked", "deleted"];
