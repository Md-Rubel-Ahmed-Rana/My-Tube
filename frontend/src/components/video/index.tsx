import { Badge } from "@/components/ui/badge";
import { useGetSingleVideoQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import VideoPlayer from "./VideoPlayer";
import moment from "moment";
import { formatDuration } from "@/utils/formatDuration";
import VideoPlayerPageSkeleton from "@/skeletons/VideoPlayLoading.skeleton";
import ChannelCard from "./ChannelCard";
import RelatedVideos from "../related-videos";
import VideoActions from "./VideoActions";
import RelatedVideosMobile from "./RelatedVideosMobile";
import VideoDescription from "./VideoDescription";
import Comments from "../comments";

const Video = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading } = useGetSingleVideoQuery({ id });
  const video = data?.data as IVideo;

  return (
    <>
      <div className="p-2 lg:p-4 flex justify-between gap-3 lg:gap-5">
        {isLoading ? (
          <div className="lg:w-[65%] w-full">
            <VideoPlayerPageSkeleton />
          </div>
        ) : (
          <div className="lg:w-[65%] w-full">
            {video && <VideoPlayer video={video} />}
            <div className="space-y-2 mt-2">
              <h2 className="text-xl font-semibold">{video?.title || ""}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>{video?.views || 0} views</span>
                <span>{moment(video?.createdAt).fromNow()}</span>
                <span>{formatDuration(video?.duration || 0)}</span>
              </div>
              <VideoActions video={video} />
              <ChannelCard channel={video?.owner} />
              {video?.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {video?.tags?.map((tag) => (
                    <Badge
                      className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      key={tag}
                      variant="outline"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              <VideoDescription
                description={video?.description || ""}
                limit={250}
              />
              <Comments />
            </div>
          </div>
        )}
        <div className="w-[30%] hidden lg:block">
          <RelatedVideos />
        </div>
      </div>
      <div className="block lg:hidden">
        <RelatedVideosMobile />
      </div>
    </>
  );
};

export default Video;
