import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { IVideo } from "@/types/video.type";
import { Card, CardContent } from "@/components/ui/card";
import { useIncrementVideoViewsMutation } from "@/features/videos";
import { useEffect, useRef } from "react";

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

  const handleReplay = () => {
    incrementView({ id: video?.id });
  };

  useEffect(() => {
    hasCountedRef.current = false;
  }, [video?.id]);

  return (
    <Card className="w-full p-0 rounded-md bg-gray-100 dark:bg-gray-800 border">
      <CardContent className="p-0 rounded-md">
        <div className="relative">
          <MediaPlayer
            title={video.title}
            src={video.videoUrl}
            controls
            aspectRatio="16/9"
            className="rounded-lg p-0 overflow-hidden lg:h-[80vh] h-auto"
            autoPlay
            onPlay={handlePlay}
            playsInline
            onReplay={handleReplay}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
