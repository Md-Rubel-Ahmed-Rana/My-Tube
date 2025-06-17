import { useSearchVideosQuery } from "@/features/videos";
import VideoLoadingSkeleton from "@/skeletons/Video-loading.skeleton";
import { useRouter } from "next/router";
import { IVideo } from "@/types/video.type";
import VideoContainer from "./VideoContainer";
import NoVideoFound from "./NoVideoFound";

const SearchResult = () => {
  const { query } = useRouter();
  const search_query = query?.search_query as string;

  const { data, isLoading, isFetching } = useSearchVideosQuery(
    { searchText: search_query },
    { refetchOnMountOrArgChange: true }
  );

  const videos = (data?.data || []) as IVideo[];

  const shouldShowSkeleton = isLoading || isFetching;

  return (
    <>
      {shouldShowSkeleton ? (
        <VideoLoadingSkeleton />
      ) : (
        <div className="p-2 lg:p-4">
          {videos.length > 0 ? (
            <VideoContainer videos={videos} />
          ) : (
            <NoVideoFound />
          )}
        </div>
      )}
    </>
  );
};

export default SearchResult;
