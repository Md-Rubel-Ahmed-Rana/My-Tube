import { IVideo } from "@/types/video.type";
import { formatVideoPublicId } from "@/utils/formatVideoPublicId";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatDuration } from "@/utils/formatDuration";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
  video: IVideo;
};

const VideoThumbnail = ({ video }: Props) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [mute, setMute] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleNavigate = () => {
    router.push(
      `/video/watch/${formatVideoPublicId(video?.publicId)}/${
        video?.id
      }?title=${video?.title}&description=${video?.description || "unknown"}`
    );
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMute((prev) => !prev);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      {
        threshold: [0.5],
      }
    );

    const current = containerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const shouldPlay = isMobile ? isInView : isHovered;

  return (
    <div
      ref={containerRef}
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
      <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md z-10">
        {formatDuration(video.duration)}
      </span>

      {shouldPlay && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <MediaPlayer
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
