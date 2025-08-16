import { useGetAllWatchLaterQuery } from "@/features/watch-later";
import { IWatchLater } from "@/types/watch-later.type";

const WatchLaterVideos = () => {
  const { data, isLoading } = useGetAllWatchLaterQuery({});

  const videos = (data?.data?.videos || []) as IWatchLater[];

  return <div>WatchLaterVideos: {videos.length}</div>;
};

export default WatchLaterVideos;
