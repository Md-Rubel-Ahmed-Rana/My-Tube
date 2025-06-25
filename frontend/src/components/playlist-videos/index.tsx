import { useGetPlaylistVideosBySlugQuery } from "@/features/playlist";
import { IPlaylist } from "@/types/playlist.type";
import { useRouter } from "next/router";
import PlaylistVideoPlayer from "./video";
import PlaylistVideosMobile from "./PlaylistVideosMobile";
import PlaylistVideosDesktop from "./PlaylistVideosDesktop";
import PlaylistHeader from "./PlaylistHeader";
import { useEffect, useState } from "react";
import { IVideo } from "@/types/video.type";

const PlayListVideos = () => {
  const { query } = useRouter();
  const playlistslug = query?.playlistslug as string;
  const { data, isLoading } = useGetPlaylistVideosBySlugQuery({
    slug: playlistslug,
  });
  const playlist = data?.data as IPlaylist;
  const [shouldLoopAVideo, setShouldLoopAVideo] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [videos, setVideos] = useState<IVideo[] | []>(
    (!isLoading && playlist?.videos) || []
  );

  useEffect(() => {
    if (!isLoading && playlist?.videos) {
      setVideos(playlist.videos);
    }
  }, [isLoading, playlist?.videos]);

  return (
    <>
      <div className="p-2 lg:p-4 flex justify-between gap-3 lg:gap-5">
        <PlaylistVideoPlayer
          shouldLoopAVideo={shouldLoopAVideo}
          isShuffle={isShuffle}
        />
        <div className="w-[30%] hidden lg:block border rounded-2xl p-2">
          <PlaylistHeader
            playlist={playlist}
            setShouldLoopAVideo={setShouldLoopAVideo}
            shouldLoopAVideo={shouldLoopAVideo}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
          />
          <PlaylistVideosDesktop
            isLoading={isLoading}
            playlist={playlist}
            videos={videos}
            setVideos={setVideos}
          />
        </div>
      </div>
      <div className="block lg:hidden">
        <PlaylistVideosMobile
          isLoading={isLoading}
          playlist={playlist}
          setShouldLoopAVideo={setShouldLoopAVideo}
          shouldLoopAVideo={shouldLoopAVideo}
          isShuffle={isShuffle}
          setIsShuffle={setIsShuffle}
          videos={videos}
          setVideos={setVideos}
        />
      </div>
    </>
  );
};

export default PlayListVideos;
