import { useGetPlaylistsByOwnerQuery } from "@/features/playlist";
import DashboardHeader from "../DashboardHeader";
import DashboardItems from "../DashboardItems";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import NoPlaylistFound from "./NoPlaylistFound";
import PlaylistContainer from "./PlaylistContainer";
import PlaylistLoadingSkeleton from "@/skeletons/PlaylistLoading.skeleton";
import { calculateTotalPlaylistsVideos } from "@/utils/calculateTotalPlaylistsVideos";

const Playlists = () => {
  const { data: userDta } = useGetLoggedInUserQuery({});
  const user = userDta?.data as IUser;
  const { data, isLoading } = useGetPlaylistsByOwnerQuery({
    userId: user?.id || "",
  });
  const playlists = data?.data || [];

  const totalVideos = calculateTotalPlaylistsVideos(playlists);

  return (
    <div className="p-2 lg:p-3 flex flex-col gap-2">
      <DashboardHeader totalVideos={totalVideos} />
      <DashboardItems />
      {isLoading ? (
        <PlaylistLoadingSkeleton />
      ) : (
        <div>
          {playlists.length > 0 ? (
            <PlaylistContainer playlists={playlists} />
          ) : (
            <NoPlaylistFound />
          )}
        </div>
      )}
    </div>
  );
};

export default Playlists;
