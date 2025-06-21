import Image from "next/image";
import Link from "next/link";
import { IVideo } from "@/types/video.type";
import { formatDuration } from "@/utils/formatDuration";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ThumbsUp, Clock } from "lucide-react";
import moment from "moment";
import { formatVideoPublicId } from "@/utils/formatVideoPublicId";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";
import VideoActions from "./VideoActions";
import { useRouter } from "next/router";

type Props = {
  video: IVideo;
};

const VideoCard = ({ video }: Props) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(
      `/video/watch/${formatVideoPublicId(video?.publicId)}/${
        video?.id
      }?title=${video?.title}&description=${video?.description || "unknown"}`
    );
  };

  return (
    <Card className="bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg overflow-hidden">
      <div onClick={handleNavigate} className="relative w-full h-52">
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
              href={`/channel/${video?.owner?.username}/${video?.owner?.id}?name=${video?.owner?.name}`}
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
                href={`/channel/${video?.owner?.username}/${video?.owner?.id}?name=${video?.owner?.name}`}
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
