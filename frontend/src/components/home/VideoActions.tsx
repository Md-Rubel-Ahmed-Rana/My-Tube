import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SaveToPlaylistModal from "../playlist-videos/SaveToPlaylistModal";
import { useState } from "react";
import { IVideo } from "@/types/video.type";
import ShareVideo from "../video/ShareVideo";

type Props = {
  video: IVideo;
};

const VideoActions = ({ video }: Props) => {
  const [isAddPlaylist, setIsAddPlaylist] = useState(false);

  const asPath = `/video/watch/${video.publicId}/${
    video.id
  }?title=${encodeURIComponent(video.title)}`;

  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${asPath}` : "";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 bg-gray-200 dark:bg-gray-700"
        >
          <DropdownMenuItem
            className="cursor-pointer mb-2 bg-gray-200 dark:bg-gray-700 w-full hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsAddPlaylist(true);
            }}
          >
            <ListPlus className="mr-2 h-4 w-4" />
            Save to Playlist
          </DropdownMenuItem>
          <DropdownMenuItem className=" bg-gray-200 cursor-pointer dark:bg-gray-700 w-full hover:bg-gray-300 dark:hover:bg-gray-600 ">
            <ShareVideo
              className="w-full flex justify-start hover:bg-gray-300 dark:hover:bg-gray-600"
              url={fullUrl}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SaveToPlaylistModal
        open={isAddPlaylist}
        setOpen={setIsAddPlaylist}
        videoId={video?.id}
      />
    </>
  );
};

export default VideoActions;
