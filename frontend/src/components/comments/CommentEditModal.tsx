import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useEditCommentMutation } from "@/features/comment";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  comment: { id: string; text: string };
};

const CommentEditModal = ({
  open,
  setOpen,
  comment = { id: "", text: "" },
}: Props) => {
  const [text, setText] = useState(comment.text);
  const [editComment, { isLoading }] = useEditCommentMutation();

  const handleSubmit = async () => {
    await handleApiMutation(
      editComment,
      { comment: { text, id: comment?.id } },
      200,
      {
        error: "Failed to edit comment",
        success: "Your comment edited successfully",
      }
    );
    setText("");
    setOpen(false);
  };

  const handleClose = () => {
    setText("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="text-primary w-5 h-5" />
            <DialogTitle>Edit Comment</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <Textarea
            placeholder="Type your comment here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading || !text.trim() || text.trim() === comment?.text.trim()
            }
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentEditModal;
