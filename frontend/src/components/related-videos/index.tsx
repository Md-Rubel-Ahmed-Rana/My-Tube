import { useGetRelatedVideosQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import RelatedVideoCard from "./RelatedVideoCard";
import RelatedVideoLoadingSkeleton from "@/skeletons/RelatedVideoLoading.skeleton";

const RelatedVideos = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading, isFetching } = useGetRelatedVideosQuery({
    currentVideoId: id,
  });
  const videos = (data?.data || []) as IVideo[];
  const isVideoLoading = isLoading || isFetching;
  return (
    <>
      {isVideoLoading ? (
        <RelatedVideoLoadingSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {videos?.map((video) => (
            <RelatedVideoCard key={video?.id} video={video} />
          ))}
        </div>
      )}
    </>
  );
};

export default RelatedVideos;
