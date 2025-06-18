import { useGetChannelVideosQuery } from "@/features/videos";
import VideoLoadingSkeleton from "@/skeletons/VideoLoading.skeleton";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import ChannelInfo from "./ChannelInfo";
import VideoCard from "../home/VideoCard";
import { useGetUserByIdQuery } from "@/features/user";
import { IUser } from "@/types/user.type";

const ChannelVideos = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading } = useGetChannelVideosQuery({ channelId: id });
  const videos = (data?.data || []) as IVideo[];

  // temporary code, it will remove is future
  const { data: userData } = useGetUserByIdQuery({ id });
  const user = userData?.data as IUser;
  return (
    <div className="p-2 lg:p-4">
      <ChannelInfo totalVideos={videos?.length || 0} />
      {isLoading ? (
        <VideoLoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3">
          {videos?.map((video) => (
            <VideoCard
              key={video?.id}
              video={{
                ...video,
                owner: video?.owner?.id ? video?.owner : user,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;
