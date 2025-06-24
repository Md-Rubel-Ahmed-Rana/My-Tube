import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IVideo } from "@/types/video.type";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import VideoDeleteModal from "./VideoDeleteModal";
import VideoThumbnailUpdateModal from "./VideoThumbnailUpdateModal";

type Props = {
  video: IVideo;
};

const MyVideoActions = ({ video }: Props) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isThumbnailChange, setIsThumbnailChange] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div onClick={handleClick}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <Link
            href={`/video/edit/${video?.slug}?title=${video?.title}`}
            className="w-full mb-2 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem className="w-full cursor-pointer">
              Edit
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsThumbnailChange(true);
            }}
            className="w-full cursor-pointer"
          >
            Change thumbnail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteModal(true);
            }}
            className="w-full cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <VideoDeleteModal
        video={video}
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
      />

      {isThumbnailChange && (
        <VideoThumbnailUpdateModal
          id={video?.id}
          open={isThumbnailChange}
          setOpen={setIsThumbnailChange}
        />
      )}
    </div>
  );
};

export default MyVideoActions;
