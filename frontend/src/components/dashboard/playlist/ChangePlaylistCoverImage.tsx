import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListVideo } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
};

const ChangePlaylistCoverImage = ({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <ListVideo className="text-primary w-5 h-5" />
            <DialogTitle>Change playlist cover image</DialogTitle>
          </div>
        </DialogHeader>
        <h4>
          This feature is currently unavailable. We truly appreciate your
          patience while we work on bringing it to you soon
        </h4>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePlaylistCoverImage;
