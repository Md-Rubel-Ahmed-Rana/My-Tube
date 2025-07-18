import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { IVideo } from "@/types/video.type";
import { Card, CardContent } from "@/components/ui/card";
import { useIncrementVideoViewsMutation } from "@/features/videos";
import { useEffect, useRef } from "react";
import { useAutoplayNextVideo } from "@/hooks/useAutoplayNextVideo";
import { useRouter } from "next/router";
import { useShuffleAutoplayNextVideo } from "@/hooks/useShuffleAutoplayNextVideo";
import NextPrevVideo from "../playlist-videos/NextPrevVideo";

type Props = {
  video: IVideo;
  shouldLoop?: boolean;
  isShuffle?: boolean;
};

const VideoPlayer = ({
  video,
  shouldLoop = false,
  isShuffle = false,
}: Props) => {
  const router = useRouter();
  const [incrementView] = useIncrementVideoViewsMutation();
  const { nextPath } = useAutoplayNextVideo();
  const { nextPath: shuffleNextPath } = useShuffleAutoplayNextVideo(true);

  const handleVideoEnd = () => {
    if (isShuffle && shuffleNextPath) {
      router.push(shuffleNextPath);
    } else if (nextPath && !shouldLoop) {
      router.push(nextPath);
    }
  };

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
            title={video?.title}
            src={video?.videoUrl}
            controls
            aspectRatio="16/9"
            className="rounded-lg p-0 overflow-hidden lg:h-[80vh] h-auto"
            autoPlay
            onPlay={handlePlay}
            playsInline
            onReplay={handleReplay}
            onEnded={handleVideoEnd}
            loop={shouldLoop}
          >
            <MediaProvider>
              <Poster
                className="media-poster"
                src={video?.thumbnailUrl}
                alt={`Thumbnail of ${video?.title}`}
              />
              <Track
                src="/captions/english.vtt"
                kind="subtitles"
                label="English"
                lang="en"
                default
              />
            </MediaProvider>
            <NextPrevVideo />
          </MediaPlayer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
