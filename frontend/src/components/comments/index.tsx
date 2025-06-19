import { useGetCommentsByVideoQuery } from "@/features/comment";
import { useRouter } from "next/router";
import NoCommentFound from "./NoCommentFound";

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
          {comments.length <= 0 ? (
            <NoCommentFound />
          ) : (
            <div className="border rounded-lg p-2 lg:p-4">
              {comments?.length || 0}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
