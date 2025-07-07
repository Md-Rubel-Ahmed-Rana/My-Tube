import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CommentStatus, IComment } from "@/types/comment.type";
import {
  useDeleteCommentPermanentlyMutation,
  useUpdateCommentStatusByAdminMutation,
} from "@/features/comment";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  comment: IComment;
};

const CommentActions = ({ comment }: Props) => {
  const [updateStatus, { isLoading }] = useUpdateCommentStatusByAdminMutation();
  const [deleteComment, { isLoading: isDeleting }] =
    useDeleteCommentPermanentlyMutation();

  const handleDelete = async () => {
    await handleApiMutation(deleteComment, { id: comment?.id }, 200);
  };

  const handleUpdateStatus = async () => {
    await handleApiMutation(
      updateStatus,
      {
        id: comment?.id,
        status:
          comment?.status === CommentStatus.ACTIVE
            ? CommentStatus.BLOCKED
            : CommentStatus.ACTIVE,
      },
      200
    );
  };
  return (
    <TableCell className="text-right space-x-2">
      <Button
        disabled={isDeleting || isLoading}
        variant="destructive"
        size="xs"
        onClick={handleDelete}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
      <Button
        disabled={isDeleting || isLoading}
        variant="default"
        size="xs"
        onClick={handleUpdateStatus}
      >
        {comment?.status === CommentStatus.ACTIVE ? "Block" : "Active"}
      </Button>
    </TableCell>
  );
};

export default CommentActions;
