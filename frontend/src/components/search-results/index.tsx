import { useSearchVideosQuery } from "@/features/videos";
import { Button } from "@/components/ui/button";
import VideoLoadingSkeleton from "@/skeletons/Video-loading.skeleton";
import { useRouter } from "next/router";
import { IVideo } from "@/types/video.type";
import VideoContainer from "./VideoContainer";
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";

const SearchResult = () => {
  const { query } = useRouter();
  const search_query = query?.search_query as string;
  const { data, isLoading } = useSearchVideosQuery({
    searchText: search_query,
  });
  const videos = (data?.data || []) as IVideo[];

  return (
    <>
      {isLoading ? (
        <VideoLoadingSkeleton />
      ) : (
        <div className="p-2 lg:p-4">
          {videos?.length > 0 ? (
            <VideoContainer videos={videos} />
          ) : (
            <NoDataFound message="No videos found">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-muted-foreground">
                  We couldn&apos;t find any videos matching:
                  <span className="font-bold text-primary ml-1">
                    &quot;{search_query}&quot;
                  </span>
                </h2>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or be the first to upload a video on
                  this topic.
                </p>
                <Link href="/video/upload">
                  <Button size="sm" className="mt-2">
                    Upload Video
                  </Button>
                </Link>
              </div>
            </NoDataFound>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResult;
