import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatDuration } from "@/utils/formatDuration";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import type { MediaPlayerInstance } from "@vidstack/react";
import { makeVideoWatchPath } from "@/utils/makeVideoWatchPath";

type Props = {
  video: IVideo;
  isInView: boolean;
};

const VideoThumbnail = ({ video, isInView }: Props) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [remainingTime, setRemainingTime] = useState(video.duration);

  const [mute, setMute] = useState(true);

  const handleNavigate = () => {
    router.push(makeVideoWatchPath(video));
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMute((prev) => !prev);
  };

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const shouldPlay = isMobile ? isInView : isHovered;

  const playerRef = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleTimeUpdate = () => {
      const current = player.currentTime;
      const total = player.duration;
      setRemainingTime(Math.max(0, total - current));
    };

    player.addEventListener("time-update", handleTimeUpdate);

    return () => {
      player.removeEventListener("time-update", handleTimeUpdate);
    };
  }, [shouldPlay]);

  return (
    <div
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-52 cursor-pointer rounded-md overflow-hidden"
    >
      <Image
        src={video.thumbnailUrl}
        alt={video.title}
        fill
        className={`object-cover transition-opacity duration-300 ${
          shouldPlay ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Duration Tag */}
      <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md z-50">
        {formatDuration(shouldPlay ? remainingTime : video.duration)}
      </span>

      {shouldPlay && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <MediaPlayer
            ref={playerRef}
            src={video.videoUrl}
            autoPlay
            muted={mute}
            loop
            playsInline
            controls={false}
            className="w-full h-full"
          >
            <MediaProvider />
          </MediaPlayer>

          <button
            onClick={handleMuteToggle}
            className="absolute top-2 right-2 z-30 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 pointer-events-auto cursor-pointer"
          >
            {mute ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
