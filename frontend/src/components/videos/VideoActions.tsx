import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { IVideo, VideoStatus } from "@/types/video.type";
import {
  useDeleteVideoPermanentlyMutation,
  useUpdateVideoStatusByAdminMutation,
} from "@/features/videos";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  video: IVideo;
};

const VideoActions = ({ video }: Props) => {
  const [updateStatus, { isLoading }] = useUpdateVideoStatusByAdminMutation();
  const [deleteVideo, { isLoading: isDeleting }] =
    useDeleteVideoPermanentlyMutation();
  const status = video?.status;

  const showPublish =
    status === VideoStatus.PENDING || status === VideoStatus.BLOCKED;
  const showReject = status === VideoStatus.PENDING;
  const showDelete =
    status === VideoStatus.PENDING || status === VideoStatus.PUBLISHED;
  const showBlock =
    status === VideoStatus.PENDING || status === VideoStatus.PUBLISHED;
  const showUnblock = status === VideoStatus.BLOCKED;
  const showRestore = status === VideoStatus.DELETED;

  const handleUpdateVideoStatus = async (status: VideoStatus) => {
    await handleApiMutation(updateStatus, { id: video?.id, status }, 200);
  };

  const handleDeleteVideo = async () => {
    await handleApiMutation(deleteVideo, { id: video?.id }, 200);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {showPublish && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdateVideoStatus(VideoStatus.PUBLISHED)}
          >
            Publish
          </DropdownMenuItem>
        )}
        {showReject && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdateVideoStatus(VideoStatus.REJECTED)}
          >
            Reject
          </DropdownMenuItem>
        )}
        {showDelete && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdateVideoStatus(VideoStatus.DELETED)}
          >
            Soft Delete
          </DropdownMenuItem>
        )}
        {showBlock && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdateVideoStatus(VideoStatus.BLOCKED)}
          >
            Block
          </DropdownMenuItem>
        )}
        {showUnblock && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdateVideoStatus(VideoStatus.PUBLISHED)}
          >
            Unblock
          </DropdownMenuItem>
        )}
        {showRestore && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdateVideoStatus(VideoStatus.PUBLISHED)}
          >
            Restore
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={isDeleting} onClick={handleDeleteVideo}>
          Permanently delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VideoActions;
