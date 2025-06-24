import { useGetChannelVideosQuery } from "@/features/videos";
import VideoLoadingSkeleton from "@/skeletons/VideoLoading.skeleton";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import ChannelInfo from "./ChannelInfo";
import VideoCard from "../home/VideoCard";
import { useGetUserBySlugQuery } from "@/features/user";
import { IUser } from "@/types/user.type";

const ChannelVideos = () => {
  const { query } = useRouter();
  const slug = query?.slug as string;
  const { data: userData, isLoading: isChannelLoading } = useGetUserBySlugQuery(
    { slug }
  );
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetChannelVideosQuery({ channelId: user?.id });
  const videos = (data?.data || []) as IVideo[];

  return (
    <div className="p-2 lg:p-4">
      <ChannelInfo
        totalVideos={videos?.length || 0}
        channel={user}
        isLoading={isChannelLoading}
      />
      {isLoading ? (
        <VideoLoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3">
          {videos?.map((video) => (
            <VideoCard key={video?.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;
