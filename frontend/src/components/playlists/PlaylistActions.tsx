import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  useDeletePlaylistPermanentlyMutation,
  useUpdatePlaylistStatusByAdminMutation,
} from "@/features/playlist";
import { IPlaylist, PlaylistStatus } from "@/types/playlist.type";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { MoreHorizontal } from "lucide-react";

type Props = {
  playlist: IPlaylist;
};

const PlaylistActions = ({ playlist }: Props) => {
  const [updateStatus, { isLoading }] =
    useUpdatePlaylistStatusByAdminMutation();
  const [deletePlaylist, { isLoading: isDeleting }] =
    useDeletePlaylistPermanentlyMutation();
  const status = playlist?.status;

  const showDelete =
    status === PlaylistStatus.PUBLIC || status === PlaylistStatus.BLOCKED;
  const showBlock = status === PlaylistStatus.PUBLIC;
  const showUnblock = status === PlaylistStatus.BLOCKED;
  const showRestore = status === PlaylistStatus.DELETED;

  const handleUpdatePlaylistStatus = async (status: PlaylistStatus) => {
    await handleApiMutation(updateStatus, { id: playlist?.id, status }, 200);
  };

  const handleDeletePlaylist = async () => {
    await handleApiMutation(deletePlaylist, { id: playlist?.id }, 200);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {showDelete && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdatePlaylistStatus(PlaylistStatus.DELETED)}
          >
            Soft Delete
          </DropdownMenuItem>
        )}
        {showBlock && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdatePlaylistStatus(PlaylistStatus.BLOCKED)}
          >
            Block
          </DropdownMenuItem>
        )}
        {showUnblock && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdatePlaylistStatus(PlaylistStatus.PUBLIC)}
          >
            Unblock
          </DropdownMenuItem>
        )}
        {showRestore && (
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleUpdatePlaylistStatus(PlaylistStatus.PUBLIC)}
          >
            Restore
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={isDeleting} onClick={handleDeletePlaylist}>
          Permanently delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlaylistActions;
