import { useGetPlaylistsByOwnerQuery } from "@/features/playlist";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import NoPlaylistFound from "./NoPlaylistFound";
import PlaylistContainer from "./PlaylistContainer";
import PlaylistLoadingSkeleton from "@/skeletons/PlaylistLoading.skeleton";

const Playlists = () => {
  const { data: userDta } = useGetLoggedInUserQuery({});
  const user = userDta?.data as IUser;
  const { data, isLoading } = useGetPlaylistsByOwnerQuery({
    userId: user?.id || "",
  });
  const playlists = data?.data || [];

  return (
    <div className="p-2 lg:p-4 flex flex-col gap-2">
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
