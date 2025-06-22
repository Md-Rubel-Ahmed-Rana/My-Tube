import { useGetSinglePlaylistVideosQuery } from "@/features/playlist";
import { IPlaylist } from "@/types/playlist.type";
import { useRouter } from "next/router";

export const useAutoplayNextVideo = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const playlistId = query.playlistId as string;
  const currentVideoId = query.id as string;

  const isPlaylistWatchRoute = pathname.startsWith("/playlist/watch");

  const { data } = useGetSinglePlaylistVideosQuery({ id: playlistId });
  const playlist = data?.data as IPlaylist;

  const videos = playlist?.videos || [];

  const currentIndex = videos.findIndex((video) => video.id === currentVideoId);

  let nextVideo = null;

  if (
    isPlaylistWatchRoute &&
    currentIndex !== -1 &&
    currentIndex < videos.length - 1
  ) {
    nextVideo = videos[currentIndex + 1];
  }

  const getNextPath = () => {
    if (!nextVideo) return null;
    return `/playlist/watch/${playlist.id}/video/${
      nextVideo.id
    }?title=${encodeURIComponent(nextVideo.title)}`;
  };

  return {
    nextVideo,
    nextPath: getNextPath(),
  };
};
