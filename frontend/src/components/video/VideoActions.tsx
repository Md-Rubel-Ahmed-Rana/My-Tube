import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LikeDislikeVideo from "./LikeDislikeVideo";
import { IVideo } from "@/types/video.type";
import CopyLink from "./CopyLink";
import DownloadVideo from "./DownloadVideo";

type Props = {
  video: IVideo;
};

const VideoActions = ({ video }: Props) => {
  return (
    <div className="flex gap-2 justify-between lg:justify-start items-center my-3 w-full">
      <div className="w-full lg:w-auto">
        <LikeDislikeVideo
          id={video?.id}
          totalLikes={video?.likes?.length || 0}
          actionType="like"
          totalDisLikes={video?.dislikes?.length || 0}
          likes={video?.likes || []}
          dislikes={video?.dislikes || []}
        />
      </div>
      <div className="w-full lg:w-auto">
        <LikeDislikeVideo
          id={video?.id}
          totalLikes={video?.likes?.length || 0}
          actionType="dislike"
          totalDisLikes={video?.dislikes?.length || 0}
          likes={video?.likes || []}
          dislikes={video?.dislikes || []}
        />
      </div>

      <div className="w-full lg:w-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"xs"} className="flex items-center gap-1 w-full">
              <Share2 className="w-4 h-4" />
              <span className="text-sm hidden lg:block">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share with others</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-full lg:w-auto">
        <CopyLink />
      </div>

      <div className="w-full lg:w-auto">
        <DownloadVideo video={video} />
      </div>
    </div>
  );
};

export default VideoActions;
