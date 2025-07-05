import { IVideo } from "@/types/video.type";

export const makeVideoWatchPath = (video: IVideo): string => {
  return `/video/watch/${video?.slug}?title=${video?.title}`;
};
