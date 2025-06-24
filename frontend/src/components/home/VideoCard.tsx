import Link from "next/link";
import { IVideo } from "@/types/video.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ThumbsUp, Clock } from "lucide-react";
import moment from "moment";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";
import VideoActions from "./VideoActions";
import { useRouter } from "next/router";
import VideoThumbnail from "./VideoThumbnail";
import { useEffect, useRef, useState } from "react";
import { makeVideoWatchPath } from "@/utils/makeVideoWatchPath";

type Props = {
  video: IVideo;
};

const VideoCard = ({ video }: Props) => {
  const router = useRouter();
  const [isInView, setIsInView] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  const handleNavigate = () => {
    router.push(makeVideoWatchPath(video));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 1);
      },
      {
        threshold: [1.0],
      }
    );

    const current = cardContainerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <Card
      ref={cardContainerRef}
      className="bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg overflow-hidden"
    >
      <VideoThumbnail video={video} isInView={isInView} />

      <CardContent className="px-2 space-y-2">
        <h2
          onClick={handleNavigate}
          className="text-base font-semibold truncate w-full"
        >
          {video.title}
        </h2>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/channel/${video?.owner?.slug}?name=${video?.owner?.name}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={video.owner?.photo} alt="profile image" />
                <AvatarFallback>
                  {formatNameForImageFallback(video?.owner?.name)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1">
              <Link
                href={`/channel/${video?.owner?.slug}?name=${video?.owner?.name}`}
              >
                {video.owner.name}
              </Link>
            </p>
          </div>
          <VideoActions video={video} />
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{video.views}</span>
            <ThumbsUp className="w-4 h-4 ml-3" />
            <span>{video.likes.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{moment(new Date(video.createdAt)).fromNow()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
