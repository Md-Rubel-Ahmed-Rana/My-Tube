import { Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LikeDislikeVideo from "./LikeDislikeVideo";
import { IVideo } from "@/types/video.type";
import CopyLink from "./CopyLink";

type Props = {
  video: IVideo;
};

const VideoActions = ({ video }: Props) => {
  return (
    <div className="flex gap-2 justify-between lg:justify-start items-center my-3 w-full">
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
          <Button
            size={"xs"}
            className="flex items-center gap-1 w-1/6 lg:w-auto"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm hidden lg:block">Share</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Share with others</TooltipContent>
      </Tooltip>

      <CopyLink />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"xs"}
            className="flex items-center gap-1 w-1/6 lg:w-auto"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm hidden lg:block">Download</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download video</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default VideoActions;
