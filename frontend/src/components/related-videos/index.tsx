import { useGetRelatedVideosQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import RelatedVideoCard from "./RelatedVideoCard";
import RelatedVideoLoadingSkeleton from "@/skeletons/RelatedVideoLoading.skeleton";

type Props = {
  currentVideoId: string;
};

const RelatedVideos = ({ currentVideoId }: Props) => {
  const { data, isLoading, isFetching } = useGetRelatedVideosQuery({
    currentVideoId,
  });
  const videos = (data?.data || []) as IVideo[];
  const isVideoLoading = isLoading || isFetching;
  return (
    <>
      {isVideoLoading ? (
        <RelatedVideoLoadingSkeleton />
      ) : (
        <div>
          <h2 className="mb-2">Top Relevant Videos</h2>
          <div className="flex flex-col gap-3 max-h-[80vh] h-full overflow-y-auto">
            {videos?.map((video) => (
              <RelatedVideoCard key={video?.id} video={video} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedVideos;
