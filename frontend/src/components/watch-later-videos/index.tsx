import { useGetAllWatchLaterQuery } from "@/features/watch-later";
import { IWatchLater } from "@/types/watch-later.type";
import { Loader2 } from "lucide-react";
import WatchLaterTable from "./WatchLaterTable";

const WatchLaterVideos = () => {
  const { data, isLoading } = useGetAllWatchLaterQuery({});

  const videos = (data?.data?.videos || []) as IWatchLater[];

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <div className="p-2 lg:p-4">
          {videos?.length < 0 ? (
            <h3 className="text-lg lg:text-2xl font-semibold">
              No watch later video found!
            </h3>
          ) : (
            <WatchLaterTable videos={videos} />
          )}
        </div>
      )}
    </>
  );
};

export default WatchLaterVideos;
