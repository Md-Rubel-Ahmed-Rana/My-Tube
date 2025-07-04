import { IComment } from "@/types/comment.type";
import CommentCard from "./CommentCard";
import AddCommentButton from "./AddCommentButton";

type Props = {
  comments: IComment[];
  videoId: string;
};

const CommentContainer = ({ comments = [], videoId }: Props) => {
  return (
    <div className="p-2 space-y-2 mb-20 lg:mb-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">
          {comments?.length || 0} comments
        </h2>
        <AddCommentButton buttonSize="xs" videoId={videoId} />
      </div>
      <div className="flex flex-col gap-2">
        {comments.map((comment) => (
          <CommentCard key={comment?.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
