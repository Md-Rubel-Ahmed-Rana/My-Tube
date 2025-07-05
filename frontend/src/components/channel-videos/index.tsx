/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetChannelVideosQuery } from "@/features/videos";
import VideoLoadingSkeleton from "@/skeletons/VideoLoading.skeleton";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import VideoCard from "../home/VideoCard";
import { useGetUserBySlugQuery } from "@/features/user";
import { IUser } from "@/types/user.type";
import ChannelCoverImage from "./ChannelCoverImage";
import UserChannel from "./UserChannel";

const ChannelVideos = () => {
  const { query } = useRouter();
  const slug = query?.slug as string;
  const { data: userData, isLoading: isChannelLoading }: any =
    useGetUserBySlugQuery({ slug });
  const user = (userData?.data[0] || userData?.data) as IUser;
  const { data, isLoading } = useGetChannelVideosQuery({
    channelId: user?.id || user?._id,
  });
  const videos = (data?.data || []) as IVideo[];

  return (
    <div className="p-2 lg:p-4 flex flex-col gap-3">
      <ChannelCoverImage user={user} isLoading={isChannelLoading} />
      <UserChannel user={user} isLoading={isChannelLoading} />
      {isLoading ? (
        <VideoLoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {videos?.map((video) => (
            <VideoCard key={video?.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;
