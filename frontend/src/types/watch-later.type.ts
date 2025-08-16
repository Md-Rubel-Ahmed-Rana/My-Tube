import { IUser } from "./user.type";
import { IVideo } from "./video.type";

export type IWatchLater = {
  id: string;
  user: IUser;
  video: IVideo;
  createdAt: Date;
  updatedAt: Date;
};
