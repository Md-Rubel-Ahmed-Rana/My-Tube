import { useGetPlaylistsByOwnerQuery } from "@/features/playlist";
import DashboardHeader from "../DashboardHeader";
import DashboardItems from "../DashboardItems";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import NoPlaylistFound from "./NoPlaylistFound";

const Playlists = () => {
  const { data: userDta } = useGetLoggedInUserQuery({});
  const user = userDta?.data as IUser;
  const { data, isLoading } = useGetPlaylistsByOwnerQuery({
    userId: user?.id || "",
  });
  const playlists = data?.data || [];
  console.log(playlists);
  return (
    <div className="p-2 lg:p-3 flex flex-col gap-2">
      <DashboardHeader totalVideos={40} />
      <DashboardItems />
      {isLoading ? (
        <div>Loading playlists...</div>
      ) : (
        <div>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div key={playlist.id} className="mb-2">
                <h3 className="text-lg font-semibold">
                  {playlist?.name || ""}
                </h3>
              </div>
            ))
          ) : (
            <NoPlaylistFound />
          )}
        </div>
      )}
    </div>
  );
};

export default Playlists;
