import { useGetSinglePlaylistVideosQuery } from "@/features/playlist";
import { IPlaylist } from "@/types/playlist.type";
import { useRouter } from "next/router";
import PlaylistVideoPlayer from "./video";
import PlaylistVideosMobile from "./PlaylistVideosMobile";
import PlaylistVideosDesktop from "./PlaylistVideosDesktop";
import PlaylistHeader from "./PlaylistHeader";
import { useState } from "react";

const PlayListVideos = () => {
  const { query } = useRouter();
  const playlistId = query?.playlistId as string;
  const { data, isLoading } = useGetSinglePlaylistVideosQuery({
    id: playlistId,
  });
  const playlist = data?.data as IPlaylist;
  const [shouldLoopAVideo, setShouldLoopAVideo] = useState(false);

  return (
    <>
      <div className="p-2 lg:p-4 flex justify-between gap-3 lg:gap-5">
        <PlaylistVideoPlayer shouldLoopAVideo={shouldLoopAVideo} />
        <div className="w-[30%] hidden lg:block border rounded-2xl p-2">
          <PlaylistHeader
            setShouldLoopAVideo={setShouldLoopAVideo}
            playlist={playlist}
            shouldLoopAVideo={shouldLoopAVideo}
          />
          <PlaylistVideosDesktop isLoading={isLoading} playlist={playlist} />
        </div>
      </div>
      <div className="block lg:hidden">
        <PlaylistVideosMobile isLoading={isLoading} playlist={playlist} />
      </div>
    </>
  );
};

export default PlayListVideos;
