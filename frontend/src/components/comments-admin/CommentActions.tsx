import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ban, ShieldCheck, Trash2 } from "lucide-react";
import { CommentStatus, IComment } from "@/types/comment.type";

type Props = {
  comment: IComment;
};

const CommentActions = ({ comment }: Props) => {
  const handleDelete = (comment: IComment) => {
    console.log("Delete", comment.id);
  };

  const toggleStatus = (comment: IComment) => {
    console.log("Toggle status", comment.id);
  };
  return (
    <TableCell className="text-right space-x-2">
      <Button
        variant="destructive"
        size="icon"
        onClick={() => handleDelete(comment)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => toggleStatus(comment)}
        title="Toggle Status"
      >
        {comment?.status === CommentStatus.ACTIVE ? (
          <Ban className="w-4 h-4 text-red-500" />
        ) : (
          <ShieldCheck className="w-4 h-4 text-green-600" />
        )}
      </Button>
    </TableCell>
  );
};

export default CommentActions;
