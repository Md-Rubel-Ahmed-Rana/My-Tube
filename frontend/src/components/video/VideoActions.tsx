import LikeDislikeVideo from "./LikeDislikeVideo";
import { IVideo } from "@/types/video.type";
import CopyLink from "./CopyLink";
import DownloadVideo from "./DownloadVideo";
import ShareVideo from "./ShareVideo";
import SaveVideo from "./SaveVideo";

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
        <ShareVideo />
      </div>

      <div className="w-full lg:w-auto">
        <CopyLink />
      </div>

      <div className="w-full lg:w-auto">
        <DownloadVideo video={video} />
      </div>
      <div className="w-full lg:w-auto">
        <SaveVideo video={video} />
      </div>
    </div>
  );
};

export default VideoActions;
