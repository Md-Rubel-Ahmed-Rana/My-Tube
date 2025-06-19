import { useGetCommentsByVideoQuery } from "@/features/comment";
import { useRouter } from "next/router";
import NoCommentFound from "./NoCommentFound";
import CommentContainer from "./CommentContainer";

const Comments = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading } = useGetCommentsByVideoQuery({ videoId: id });
  const comments = data?.data || [];
  return (
    <div>
      {isLoading ? (
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
