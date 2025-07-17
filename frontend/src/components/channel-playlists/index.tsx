/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserPublicPlaylistsQuery } from "@/features/playlist";
import { useGetUserBySlugQuery } from "@/features/user";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import ChannelCoverImage from "../channel-videos/ChannelCoverImage";
import UserChannel from "../channel-videos/UserChannel";
import ChannelTabs from "../channel-videos/ChannelTabs";
import PlaylistLoadingSkeleton from "@/skeletons/PlaylistLoading.skeleton";
import { IPlaylist } from "@/types/playlist.type";
import NoDataFound from "../common/NoDataFound";
import PlaylistCard from "./PlaylistCard";

const ChannelPlaylists = () => {
  const { query } = useRouter();
  const slug = query?.slug as string;
  const { data: userData, isLoading: isChannelLoading }: any =
    useGetUserBySlugQuery({ slug });
  const user = (userData?.data[0] || userData?.data) as IUser;

  const { data, isLoading } = useGetUserPublicPlaylistsQuery({
    userId: user?.id || user?._id,
  });

  const playlists = (data?.data || []) as IPlaylist[];

  return (
    <div className="p-2 lg:p-4 flex flex-col gap-3">
      <ChannelCoverImage user={user} isLoading={isChannelLoading} />

      <UserChannel user={user} isLoading={isChannelLoading} />
      <ChannelTabs user={user} />
      {isLoading ? (
        <PlaylistLoadingSkeleton />
      ) : (
        <>
          {playlists.length <= 0 ? (
            <NoDataFound message="No Playlists Found!">
              <h2>The channel has no public playlists available</h2>
            </NoDataFound>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist?.id} playlist={playlist} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChannelPlaylists;
