import { IVideo } from "./video.type";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  BANNED = "banned",
  DELETED = "deleted",
}

export type IUser = {
  _id: string;
  id: string;
  name: string;
  username: string;
  slug: string;
  subscriptions: number;
  subscribers: number;
  subscribed: number;
  photo: string;
  status: UserStatus;
  coverImage: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

type WatchTrendEntry = {
  date: string;
  minutes: number;
};

export type IUserActivityStats = {
  commentsMade: number;
  likesGiven: number;
  minutesWatched: number;
  subscribers: number;
  videosUploaded: number;
  videosWatched: number;
  watchTrend: WatchTrendEntry[];
};

export type IUserWatchHistory = {
  id: string;
  _id: string;
  duration: number;
  watchedAt: Date;
  video: IVideo;
};

export type IUserStat = {
  id: string;
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  username: string;
  slug: string;
  status: string;
  totalVideos: number;
  totalPlaylists: number;
  totalSubscribedChannels: number;
  totalSubscribers: number;
};
