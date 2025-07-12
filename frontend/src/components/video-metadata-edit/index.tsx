import { useGetSingleVideoBySlugQuery } from "@/features/videos";
import VideoEditPageSkeleton from "@/skeletons/VideoEditLoading.skeleton";
import { useRouter } from "next/router";
import VideoEditForm from "./VideoEditForm";
import { IVideo } from "@/types/video.type";

const VideoMetadataUpdate = () => {
  const { query } = useRouter();
  const slug = query?.slug as string;
  const { data, isLoading } = useGetSingleVideoBySlugQuery({ slug });
  const video = data?.data as IVideo;
  return (
    <div className="p-2 lg:p-4">
      {isLoading ? (
        <VideoEditPageSkeleton />
      ) : (
        <div className="max-w-2xl mx-auto">
          <VideoEditForm video={video} />
        </div>
      )}
    </div>
  );
};

export default VideoMetadataUpdate;
