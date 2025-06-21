import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListVideo } from "lucide-react";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useDeletePlaylistMutation } from "@/features/playlist";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
};

const PlaylistDeleteModal = ({ open, setOpen, id = "" }: Props) => {
  const [deletePlaylist, { isLoading }] = useDeletePlaylistMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    await handleApiMutation(
      deletePlaylist,
      { id },
      200,
      {
        error: "Failed to delete playlist",
        success: "Your playlist deleted successfully",
      },
      {
        isRedirect: true,
        path: "/dashboard/playlists",
        router,
      }
    );
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
            <ListVideo className="text-primary w-5 h-5" />
            <DialogTitle>Delete playlist</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete the playlist?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleClose} disabled={isLoading}>
            No
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Yes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistDeleteModal;
