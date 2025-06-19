import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useEditCommentMutation } from "@/features/comment";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
};

const CommentDeleteModal = ({ open, setOpen, id = "" }: Props) => {
  const [editComment, { isLoading }] = useEditCommentMutation();

  const handleSubmit = async () => {
    // await handleApiMutation(
    //   editComment,
    //   { comment: { text, id: comment?.id } },
    //   200,
    //   {
    //     error: "Failed to edit comment",
    //     success: "Your comment edited successfully",
    //   }
    // );
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="text-primary w-5 h-5" />
            <DialogTitle>Delete comment</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete the comment?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Yes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDeleteModal;
