import { useGetSingleVideoQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import VideoPlayer from "./VideoPlayer";
import moment from "moment";
import { formatDuration } from "@/utils/formatDuration";
import VideoPlayerPageSkeleton from "@/skeletons/Video-player-page.skeleton";

const Video = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading } = useGetSingleVideoQuery({ id });
  const video = data?.data as IVideo;
  return (
    <div className="p-2 lg:p-4">
      {isLoading ? (
        <VideoPlayerPageSkeleton />
      ) : (
        <div>
          {video && <VideoPlayer video={video} />}
          <div className="space-y-2 mt-2">
            <h2 className="text-xl font-semibold">{video?.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{video?.views} views</span>
              <span>{moment(video?.createdAt).fromNow()}</span>
              <span>{formatDuration(video?.duration)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {video?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
