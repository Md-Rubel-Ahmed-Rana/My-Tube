import Link from "next/link";
import { IVideo } from "@/types/video.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";
import { useRouter } from "next/router";
import { makeVideoWatchPath } from "@/utils/makeVideoWatchPath";
import Image from "next/image";
import { formatDuration } from "@/utils/formatDuration";

type Props = {
  video: IVideo;
};

const VideoCard = ({ video }: Props) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(makeVideoWatchPath(video));
  };

  return (
    <Card className="bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg overflow-hidden">
      <div
        onClick={handleNavigate}
        className="relative w-full h-52 cursor-pointer rounded-md overflow-hidden"
      >
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className={`object-cover transition-opacity duration-300 opacity-100`}
        />

        {/* Duration Tag */}
        <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md z-50">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
