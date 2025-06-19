import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useAddNewCommentMutation } from "@/features/comment";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: string;
};

const AddCommentModal = ({ open, setOpen, user }: Props) => {
  const { query } = useRouter();
  const id = query?.id as string;
  const [text, setText] = useState("");
  const [addComment, { isLoading }] = useAddNewCommentMutation();

  const handleSubmit = async () => {
    await handleApiMutation(
      addComment,
      { comment: { text, video: id, user } },
      201,
      {
        error: "Failed to add comment",
        success: "Your comment posted successfully",
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
            <DialogTitle>Add a Comment</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Share your thoughts or feedback about this video.
          </DialogDescription>
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
          <Button onClick={handleSubmit} disabled={isLoading || !text.trim()}>
            {isLoading ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCommentModal;
