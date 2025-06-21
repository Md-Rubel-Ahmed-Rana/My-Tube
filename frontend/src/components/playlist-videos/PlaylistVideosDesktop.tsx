import RelatedVideoLoadingSkeleton from "@/skeletons/RelatedVideoLoading.skeleton";
import { IPlaylist } from "@/types/playlist.type";
import PlaylistVideoCardDesktop from "./PlaylistVideoCardDesktop";

type Props = {
  playlist: IPlaylist;
  isLoading: boolean;
};

const PlaylistVideosDesktop = ({ playlist, isLoading }: Props) => {
  return (
    <div className="h-[65vh] flex-1 overflow-y-auto ">
      {isLoading ? (
        <RelatedVideoLoadingSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {playlist.videos?.map((video) => (
            <PlaylistVideoCardDesktop key={video?.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistVideosDesktop;
