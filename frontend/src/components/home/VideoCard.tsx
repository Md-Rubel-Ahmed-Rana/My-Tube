import Image from "next/image";
import Link from "next/link";
import { IVideo } from "@/types/video.type";
import { formatDuration } from "@/utils/formatDuration";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ThumbsUp, Clock } from "lucide-react";
import moment from "moment";

type Props = {
  video: IVideo;
};

const VideoCard = ({ video }: Props) => {
  return (
    <Link
      href={`/video/watch/${video?.publicId}/${video?.id}?title=${
        video?.title
      }&description=${video?.description || "unknown"}`}
    >
      <Card className="bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg overflow-hidden">
        <div className="relative w-full h-52">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover"
          />
          <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
            {formatDuration(video.duration)}
          </span>
        </div>

        <CardContent className="p-2 lg:p-2 space-y-2">
          <h2 className="text-base font-semibold truncate w-full">
            {video.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {video.owner.name}
          </p>

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
    </Link>
  );
};

export default VideoCard;
