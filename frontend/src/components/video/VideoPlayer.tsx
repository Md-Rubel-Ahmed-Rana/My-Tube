import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { IVideo } from "@/types/video.type";
import { Card, CardContent } from "@/components/ui/card";
import { useIncrementVideoViewsMutation } from "@/features/videos";
import { useEffect, useRef, useState } from "react";
import VideoSettings from "./VideoSettings";
import SeekControls from "./SeekControls";

type Props = {
  video: IVideo;
};

const VideoPlayer = ({ video }: Props) => {
  const [incrementView] = useIncrementVideoViewsMutation();
  const hasCountedRef = useRef(false);
  const [isLoop, setIsLoop] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const handleUserInteract = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  return (
    <Card className="w-full p-0 rounded-md bg-gray-100 dark:bg-gray-800 border">
      <CardContent className="p-0 rounded-md">
        <div
          className="relative"
          onMouseMove={handleUserInteract}
          onClick={handleUserInteract}
        >
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
            loop={isLoop}
          >
            {showControls && (
              <>
                <button className="absolute cursor-pointer bottom-20 right-2 z-50 rounded-full opacity-85 hover:bg-gray-800 transition px-2">
                  <VideoSettings loop={isLoop} setLoop={setIsLoop} />
                </button>
                <SeekControls />
              </>
            )}

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
