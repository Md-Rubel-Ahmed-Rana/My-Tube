import { useSearchVideosQuery } from "@/features/videos";
import VideoLoadingSkeleton from "@/skeletons/Video-loading.skeleton";
import { useRouter } from "next/router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IVideo } from "@/types/video.type";
import { Info } from "lucide-react";
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

  if (!search_query?.trim()) {
    return (
      <div className="p-4">
        <Alert className="bg-gray-200 dark:bg-gray-700">
          <Info className="h-5 w-5" />
          <AlertTitle>Empty Search</AlertTitle>
          <AlertDescription>
            Please enter a search term to see results.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
