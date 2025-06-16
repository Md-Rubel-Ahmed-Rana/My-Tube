import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { IVideo } from "@/types/video.type";
import { Card, CardContent } from "@/components/ui/card";
import { useIncrementVideoViewsMutation } from "@/features/videos";
import { useRef } from "react";

type Props = {
  video: IVideo;
};

const VideoPlayer = ({ video }: Props) => {
  const [incrementView] = useIncrementVideoViewsMutation();
  const hasCountedRef = useRef(false);

  const handlePlay = () => {
    if (!hasCountedRef.current) {
      incrementView({ id: video?.id });
      hasCountedRef.current = true;
    }
  };

  return (
    <Card className="w-full p-0 rounded-md bg-gray-100 dark:bg-gray-800 border">
      <CardContent className="p-0 rounded-md">
        <MediaPlayer
          title={video.title}
          src={video.videoUrl}
          controls={true}
          aspectRatio="16/9"
          className="rounded-md p-0 overflow-hidden lg:h-[80vh] h-auto"
          autoPlay={true}
          onPlay={handlePlay}
          playsInline={true}
        >
          <MediaProvider>
            <Poster
              className="media-poster"
              src={video.thumbnailUrl}
              alt={`Thumbnail of ${video.title}`}
            />
            <Track
              src="/captions/english.vtt"
              kind="subtitles"
              label="English"
              lang="en"
              default
            />
          </MediaProvider>
        </MediaPlayer>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
