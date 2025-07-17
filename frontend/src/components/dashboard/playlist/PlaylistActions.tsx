import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPlaylist } from "@/types/playlist.type";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import PlaylistEditModal from "./PlaylistEditModal";
import PlaylistDeleteModal from "./PlaylistDeleteModal";
import ChangePlaylistCoverImage from "./ChangePlaylistCoverImage";
import UpdatePlayListStatus from "./UpdatePlayListStatus";

type Props = {
  playlist: IPlaylist;
};

const PlaylistActions = ({ playlist }: Props) => {
  const [isEditName, setIsEditName] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEditCoverImage, setIsEditCoverImage] = useState(false);
  const [isUpdateStatus, setIsUpdateStatus] = useState(false);
  return (
    <>
      <div className="flex gap-2 flex-wrap mt-2   sm:mt-0">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-300 dark:bg-gray-700"
          >
            <DropdownMenuItem
              onClick={() => setIsEditName(true)}
              className="cursor-pointer"
            >
              Edit name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsUpdateStatus(true)}
              className="cursor-pointer"
            >
              Update Status
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsEditCoverImage(true)}
              className="cursor-pointer"
            >
              Change cover image
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setIsDelete(true)}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isEditName && (
        <PlaylistEditModal
          open={isEditName}
          setOpen={setIsEditName}
          playlist={playlist}
        />
      )}

      {isDelete && (
        <PlaylistDeleteModal
          id={playlist?.id}
          open={isDelete}
          setOpen={setIsDelete}
        />
      )}

      {isEditCoverImage && (
        <ChangePlaylistCoverImage
          id={playlist?.id}
          open={isEditCoverImage}
          setOpen={setIsEditCoverImage}
        />
      )}
      {isUpdateStatus && (
        <UpdatePlayListStatus
          playlist={playlist}
          open={isUpdateStatus}
          setOpen={setIsUpdateStatus}
        />
      )}
    </>
  );
};

export default PlaylistActions;
