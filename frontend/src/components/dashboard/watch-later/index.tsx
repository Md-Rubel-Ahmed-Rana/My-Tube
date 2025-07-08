/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserWatchLaterQuery } from "@/features/watch-later";
import { IVideo } from "@/types/video.type";
import VideoCard from "./VideoCard";
import { useSidebar } from "@/components/ui/sidebar";
import VideoLoadingSkeleton from "@/skeletons/VideoLoading.skeleton";

const WatchLaterVideos = () => {
  const { open } = useSidebar();
  const { data, isLoading } = useGetUserWatchLaterQuery({});
  const videos: IVideo[] = data?.data
    ? data?.data?.map((video: any) => video?.video)
    : [];

  return (
    <div className="p-2 lg:p-4">
      {isLoading ? (
        <VideoLoadingSkeleton />
      ) : (
        <>
          {videos?.length <= 0 ? (
            <div className="w-full h-[20vh] flex justify-center items-center">
              <h2 className="text-lg font-semibold">
                You don&apos;t have any video on watch later
              </h2>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
                open ? 3 : 4
              } gap-2`}
            >
              {videos?.map((video) => (
                <VideoCard key={video?.id || video?.slug} video={video} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WatchLaterVideos;
