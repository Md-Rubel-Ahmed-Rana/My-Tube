import { useGetPlaylistVideosBySlugQuery } from "@/features/playlist";
import { IPlaylist } from "@/types/playlist.type";
import { useRouter } from "next/router";

export const useShuffleAutoplayNextVideo = (isShuffle: boolean) => {
  const router = useRouter();
  const { pathname, query } = router;

  const playlistSlug = query.playlistslug as string;
  const currentVideoSlug = query.videoslug as string;

  const isPlaylistWatchRoute = pathname?.startsWith("/playlist/watch");

  const { data } = useGetPlaylistVideosBySlugQuery({ slug: playlistSlug });
  const playlist = data?.data as IPlaylist;

  const videos = playlist?.videos || [];

  const currentIndex = videos.findIndex(
    (video) => video.slug === currentVideoSlug
  );

  let nextVideo = null;

  if (isPlaylistWatchRoute && currentIndex !== -1) {
    if (isShuffle) {
      const remainingVideos = videos.filter(
        (video) => video.slug !== currentVideoSlug
      );
      if (remainingVideos.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingVideos.length);
        nextVideo = remainingVideos[randomIndex];
      }
    } else if (currentIndex < videos.length - 1) {
      nextVideo = videos[currentIndex + 1];
    }
  }

  const getNextPath = () => {
    if (!nextVideo) return null;
    return `/playlist/watch/${playlist.slug}/video/${
      nextVideo.slug
    }?title=${encodeURIComponent(nextVideo.title)}`;
  };

  return {
    nextVideo,
    nextPath: getNextPath(),
  };
};
