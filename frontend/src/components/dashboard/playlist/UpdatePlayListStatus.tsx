import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IPlaylist, PlaylistStatus } from "@/types/playlist.type";
import { ListVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdatePlaylistStatusMutation } from "@/features/playlist";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: IPlaylist;
};

const UpdatePlayListStatus = ({ open, setOpen, playlist }: Props) => {
  const [update, { isLoading }] = useUpdatePlaylistStatusMutation();

  const handleUpdatePlaylistStatus = async () => {
    await handleApiMutation(
      update,
      {
        id: playlist?.id,
        status:
          playlist.status === PlaylistStatus.PRIVATE
            ? PlaylistStatus.PUBLIC
            : PlaylistStatus.PRIVATE,
      },
      200
    );
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isShow =
    playlist.status === PlaylistStatus.PRIVATE ||
    playlist.status === PlaylistStatus.PUBLIC;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <ListVideo className="text-primary w-5 h-5" />
            <DialogTitle>Change playlist status</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Your playlist is now <strong>{playlist?.status}</strong>
          </DialogDescription>
        </DialogHeader>
        {isShow && (
          <div className="flex justify-end gap-2 pt-4">
            <Button disabled={isLoading}>Cancel</Button>
            <Button onClick={handleUpdatePlaylistStatus} disabled={isLoading}>
              {isLoading
                ? "Changing..."
                : `Make ${
                    playlist.status === PlaylistStatus.PRIVATE
                      ? PlaylistStatus.PUBLIC
                      : PlaylistStatus.PRIVATE
                  }`}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlayListStatus;
