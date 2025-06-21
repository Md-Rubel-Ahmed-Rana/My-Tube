import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Video } from "lucide-react";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRemoveVideoFromPlaylistMutation } from "@/features/playlist";

type Props = {
  playlistId: string;
  videoId: string;
  isRemoveVideo: boolean;
  setIsRemoveVideo: (value: boolean) => void;
};

const RemovePlaylistVideo = ({
  playlistId,
  videoId,
  isRemoveVideo,
  setIsRemoveVideo,
}: Props) => {
  const [removeVideo, { isLoading }] = useRemoveVideoFromPlaylistMutation();

  const handleRemoveVideo = async () => {
    await handleApiMutation(removeVideo, { id: playlistId, videoId }, 200, {
      error: "Failed to delete playlist",
      success: "Your playlist deleted successfully",
    });
    setIsRemoveVideo(false);
  };

  const handleClose = () => {
    setIsRemoveVideo(false);
  };

  return (
    <Dialog open={isRemoveVideo} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Video className="text-primary w-5 h-5" />
            <DialogTitle>Remove playlist</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to remove the video?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleClose} disabled={isLoading}>
            No
          </Button>
          <Button onClick={handleRemoveVideo} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Yes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemovePlaylistVideo;
