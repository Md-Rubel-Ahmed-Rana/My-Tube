import { useGetCommentsByVideoQuery } from "@/features/comment";
import { useRouter } from "next/router";
import NoCommentFound from "./NoCommentFound";
import CommentContainer from "./CommentContainer";
import CommentLoadingSkeleton from "@/skeletons/CommentLoading.skeleton";
import { IVideo } from "@/types/video.type";
import { useGetSingleVideoBySlugQuery } from "@/features/videos";

const Comments = () => {
  const { query } = useRouter();
  const slug = query?.videoslug as string;
  const { data: videoData } = useGetSingleVideoBySlugQuery({ slug: slug });
  const video = videoData?.data as IVideo;
  const { data, isLoading, isFetching } = useGetCommentsByVideoQuery(
    { videoId: video?.id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const comments = data?.data || [];

  const isCommentLoading = isLoading || isFetching;

  return (
    <div>
      {isCommentLoading ? (
        <CommentLoadingSkeleton />
      ) : (
        <div>
          {comments?.length <= 0 ? (
            <NoCommentFound />
          ) : (
            <CommentContainer comments={comments} videoId={video?.id} />
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
