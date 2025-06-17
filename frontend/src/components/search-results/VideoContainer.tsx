import { IVideo } from "@/types/video.type";
import VideoCard from "../home/VideoCard";

type Props = {
  videos: IVideo[];
};

const VideoContainer = ({ videos = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {videos?.map((video) => (
        <VideoCard key={video?.id} video={video} />
      ))}
    </div>
  );
};

export default VideoContainer;
