import { Share2, Link as LinkIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LikeDislikeVideo from "./LikeDislikeVideo";
import { IVideo } from "@/types/video.type";

type Props = {
  video: IVideo;
};

const VideoActions = ({ video }: Props) => {
  return (
    <div className="flex gap-3 flex-wrap mt-4">
      <LikeDislikeVideo
        id={video?.id}
        totalLikes={video?.likes?.length || 0}
        actionType="like"
        totalDisLikes={video?.dislikes?.length || 0}
      />

      <LikeDislikeVideo
        id={video?.id}
        totalLikes={video?.likes?.length || 0}
        actionType="dislike"
        totalDisLikes={video?.dislikes?.length || 0}
      />

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
