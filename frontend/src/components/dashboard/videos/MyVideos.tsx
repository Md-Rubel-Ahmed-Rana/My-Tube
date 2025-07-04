import { IVideo } from "@/types/video.type";
import MyVideoCard from "./MyVideoCard";
import NoDataFound from "../../common/NoDataFound";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useGetVideosByOwnerQuery } from "@/features/videos";
import VideoLoadingSkeleton from "@/skeletons/VideoLoading.skeleton";

const MyVideos = () => {
  const { data, isLoading } = useGetVideosByOwnerQuery();
  const videos = (data?.data || []) as IVideo[];
  return (
    <div className="p-2 lg:p-4">
      {isLoading ? (
        <VideoLoadingSkeleton />
      ) : (
        <>
          {videos?.length <= 0 ? (
            <NoDataFound message="No videos found!">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">
                  You haven&apos;t uploaded any video yet.
                </h3>
                <p className="text-muted-foreground">
                  To upload your favorite video click below button
                </p>
                <Link href={"/video/upload"}>
                  <Button variant="ghost" className="border">
                    <Plus className="h-5 w-5" />
                    <span>Upload</span>
                  </Button>
                </Link>
              </div>
            </NoDataFound>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {videos.map((video) => (
                <MyVideoCard video={video} key={video?.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyVideos;
