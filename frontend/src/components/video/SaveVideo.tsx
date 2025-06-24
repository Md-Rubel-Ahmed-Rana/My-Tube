import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ListVideo } from "lucide-react";
import SaveToPlaylistModal from "../playlist-videos/SaveToPlaylistModal";
import { useState } from "react";
import { IVideo } from "@/types/video.type";

type Props = {
  video: IVideo;
};

const SaveVideo = ({ video }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 w-full"
            size={"xs"}
          >
            <ListVideo className="w-4 h-4" />
            <span className="hidden lg:block">Save</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Save to playlist</TooltipContent>
      </Tooltip>

      <SaveToPlaylistModal
        open={isOpen}
        setOpen={setIsOpen}
        videoId={video?.id}
      />
    </>
  );
};

export default SaveVideo;
