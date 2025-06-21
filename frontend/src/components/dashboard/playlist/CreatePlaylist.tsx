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
import { useCreatePlaylistMutation } from "@/features/playlist";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CreatePlaylist = ({ open, setOpen }: Props) => {
  const [name, setName] = useState("");
  const [playlistCreate, { isLoading }] = useCreatePlaylistMutation();

  const handleSubmit = async () => {
    await handleApiMutation(playlistCreate, { playlist: { name } }, 201, {
      error: "Failed to create playlist",
      success: "Your playlist created successfully",
    });
    setName("");
    setOpen(false);
  };

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <ListVideo className="text-primary w-5 h-5" />
            <DialogTitle>Create playlist</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <Input
            placeholder="Type your playlist name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="resize-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !name.trim()}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylist;
