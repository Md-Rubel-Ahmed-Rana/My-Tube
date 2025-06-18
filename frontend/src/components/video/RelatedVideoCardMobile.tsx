import { IVideo } from "@/types/video.type";
import Image from "next/image";
import Link from "next/link";
import { formatDuration } from "@/utils/formatDuration";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { formatVideoPublicId } from "@/utils/formatVideoPublicId";

type Props = {
  video: IVideo;
};

const RelatedVideoCardMobile = ({ video }: Props) => {
  return (
    <Link
      href={`/video/watch/${formatVideoPublicId(video?.publicId)}/${
        video?.id
      }?title=${video?.title}&description=${video?.description || "unknown"}`}
      className="w-full"
    >
      <Card className="bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-md overflow-hidden w-full p-2">
        <div className="flex justify-between w-full gap-3">
          <div className="w-[30%]">
            <div className="relative h-14">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover rounded-md"
              />
              <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
                {formatDuration(video.duration)}
              </span>
            </div>
          </div>
          <CardContent className="px-2 space-y-2 w-[70%]">
            <h2 className="text-sm font-semibold truncate">{video.title}</h2>

            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground line-clamp-1">
                {video.owner.name}
              </p>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="text-xs">{video.views}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default RelatedVideoCardMobile;
