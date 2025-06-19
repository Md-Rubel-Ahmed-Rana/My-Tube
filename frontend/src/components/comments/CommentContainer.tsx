import { IComment } from "@/types/comment.type";
import CommentCard from "./CommentCard";
import { Button } from "@/components/ui/button";

type Props = {
  comments: IComment[];
};

const CommentContainer = ({ comments = [] }: Props) => {
  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">
          {comments?.length || 0} comments
        </h2>
        <Button variant="outline" className="bg-gray-200 dark:bg-gray-700">
          Add a Comment
        </Button>
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
