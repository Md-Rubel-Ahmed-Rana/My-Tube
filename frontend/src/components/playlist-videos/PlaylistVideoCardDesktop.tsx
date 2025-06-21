import { IVideo } from "@/types/video.type";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { formatDuration } from "@/utils/formatDuration";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Clock, PlayCircle, Trash2 } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";
import RemovePlaylistVideo from "./RemovePlaylistVideo";
import { useState } from "react";

type Props = {
  video: IVideo;
};

const PlaylistVideoCardDesktop = ({ video }: Props) => {
  const { query, push } = useRouter();
  const playlistId = query?.playlistId as string;
  const videoId = query?.id as string;
  const [isRemoveVideo, setIsRemoveVideo] = useState(false);

  const handleCardClick = () => {
    push(
      `/playlist/watch/${playlistId}/video/${
        video.id
      }?title=${encodeURIComponent(video.title)}`
    );
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-shadow duration-300 cursor-pointer rounded-md overflow-hidden w-full p-2 border-0"
      >
        <div className="flex justify-between w-full gap-3">
          <div className="w-2/5">
            <div className="relative h-14">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover rounded-lg"
              />
              <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
                {formatDuration(video.duration)}
              </span>
            </div>
          </div>
          <CardContent className="px-2 space-y-2 w-3/5">
            <h2 className="text-sm font-semibold truncate">{video.title}</h2>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {video.owner.name}
            </p>
            <div className="flex text-xs justify-between items-center gap-2">
              <div className="flex text-xs items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{video.views}</span>
                <Clock className="w-4 h-4" />
                <span>{moment(new Date(video.createdAt)).fromNow()}</span>
              </div>
              {videoId === video?.id ? (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <PlayCircle className="w-4 h-4" />
                  Playing
                </span>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsRemoveVideo(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Remove video</TooltipContent>
                </Tooltip>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
      {isRemoveVideo && (
        <RemovePlaylistVideo
          playlistId={playlistId}
          videoId={video?.id}
          isRemoveVideo={isRemoveVideo}
          setIsRemoveVideo={setIsRemoveVideo}
        />
      )}
    </>
  );
};

export default PlaylistVideoCardDesktop;
