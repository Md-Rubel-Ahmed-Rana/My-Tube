import { useGetSingleVideoQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import VideoEditPageSkeleton from "@/skeletons/VideoEditLoading.skeleton";
import VideoEditForm from "./VideoEditForm";

const VideoEdit = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading } = useGetSingleVideoQuery({ id });
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

export default VideoEdit;
