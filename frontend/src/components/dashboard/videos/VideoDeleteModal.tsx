import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteVideoMutation } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/router";

type Props = {
  video: IVideo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const VideoDeleteModal = ({ video, onOpenChange, open }: Props) => {
  const router = useRouter();
  const [deleteVideo, { isLoading }] = useDeleteVideoMutation();

  const handleDeleteVideo = async () => {
    await handleApiMutation(
      deleteVideo,
      { id: video?.id },
      200,
      {
        success: "✅ Video deleted successfully!",
        error: "❌ Video delete failed. Please try again.",
      },
      {
        isRedirect: true,
        path: "/dashboard/videos",
        router,
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            video titled: <span className="font-semibold">{video.title}</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between w-full">
          <DialogClose asChild>
            <Button variant="secondary" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeleteVideo}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDeleteModal;
