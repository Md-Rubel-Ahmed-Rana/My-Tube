import { useGetCommentsByVideoQuery } from "@/features/comment";
import { useRouter } from "next/router";
import NoCommentFound from "./NoCommentFound";
import CommentContainer from "./CommentContainer";

const Comments = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading, isFetching } = useGetCommentsByVideoQuery(
    { videoId: id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const comments = data?.data || [];

  const isCommentLoading = isLoading || isFetching;

  return (
    <div>
      {isCommentLoading ? (
        <div>Comments loading...</div>
      ) : (
        <div>
          {comments?.length <= 0 ? (
            <NoCommentFound />
          ) : (
            <CommentContainer comments={comments} />
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
