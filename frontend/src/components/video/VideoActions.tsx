import { ThumbsDown, Share2, Link as LinkIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LikeVideo from "./LikeVideo";
import { IVideo } from "@/types/video.type";

type Props = {
  video: IVideo;
};

const VideoActions = ({ video }: Props) => {
  return (
    <div className="flex gap-3 flex-wrap mt-4">
      <LikeVideo id={video?.id} totalLikes={video?.likes?.length || 0} />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="flex items-center gap-1">
            <ThumbsDown className="w-4 h-4" />
            <span className="text-sm">Dislike (0)</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Dislike this video</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Share with others</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="flex items-center gap-1">
            <LinkIcon className="w-4 h-4" />
            <span className="text-sm">Copy Link</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy video link</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span className="text-sm">Download</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download video</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default VideoActions;
