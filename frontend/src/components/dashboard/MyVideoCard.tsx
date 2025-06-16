import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, ThumbsDown, Clock, FileText } from "lucide-react";
import { IVideo } from "@/types/video.type";
import Image from "next/image";
import moment from "moment";
import { formatBytes } from "@/utils/formatBytes";
import { formatDuration } from "@/utils/formatDuration";
import Link from "next/link";
import { formatVideoPublicId } from "@/utils/formatVideoPublicId";
import MyVideoActions from "./MyVideoActions";

type Props = {
  video: IVideo;
};

const MyVideoCard = ({ video }: Props) => {
  return (
    <Link
      href={`/video/watch/${formatVideoPublicId(video?.publicId)}/${
        video?.id
      }?title=${video?.title}&description=${video?.description || "unknown"}`}
    >
      <Card className=" bg-gray-100 dark:bg-gray-800 flex flex-col md:flex-row gap-4 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
        <div className="relative w-full md:w-64 h-36 md:h-40 rounded-lg overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover"
          />
        </div>

        <CardContent className="flex-1 flex flex-col justify-between p-0">
          <div>
            <div className="flex justify-between gap-1">
              <CardTitle className="text-xl font-semibold">
                {video.title}
              </CardTitle>
              <div>
                <MyVideoActions video={video} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Uploaded {moment(new Date(video.createdAt)).fromNow()}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {video.views}
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {video.likes.length}
            </div>
            <div className="flex items-center gap-1">
              <ThumbsDown className="w-4 h-4" />
              {video.dislikes.length}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDuration(video.duration)}
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {formatBytes(video.size)}
            </div>
          </div>

          {video.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {video.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default MyVideoCard;
