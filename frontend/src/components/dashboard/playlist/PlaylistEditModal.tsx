import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListVideo } from "lucide-react";
import { useState } from "react";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useUpdatePlaylistMutation } from "@/features/playlist";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: { id: string; name: string };
};

const PlaylistEditModal = ({
  open,
  setOpen,
  playlist = { id: "", name: "" },
}: Props) => {
  const [newName, setNewName] = useState(playlist?.name);
  const [editPlaylist, { isLoading }] = useUpdatePlaylistMutation();

  const handleSubmit = async () => {
    await handleApiMutation(
      editPlaylist,
      { name: newName, id: playlist?.id },
      200,
      {
        error: "Failed to edit playlist",
        success: "Your playlist edited successfully",
      }
    );
    setNewName("");
    setOpen(false);
  };

  const handleClose = () => {
    setNewName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <ListVideo className="text-primary w-5 h-5" />
            <DialogTitle>Edit playlist</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <Input
            placeholder="Type your playlist name here..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !newName.trim() ||
              newName.trim() === playlist?.name.trim()
            }
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistEditModal;
