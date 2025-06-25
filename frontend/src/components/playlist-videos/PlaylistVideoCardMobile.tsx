import { IVideo } from "@/types/video.type";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { formatDuration } from "@/utils/formatDuration";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import RemovePlaylistVideo from "./RemovePlaylistVideo";
import { useState } from "react";
import { AudioLines, GripVertical, PlayCircle, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  video: IVideo;
  playlistId: string;
};

const PlaylistVideoCardMobile = ({ video, playlistId }: Props) => {
  const { query } = useRouter();
  const videoslug = query?.videoslug as string;
  const [isRemoveVideo, setIsRemoveVideo] = useState(false);
  const { listeners } = useSortable({ id: video.id });

  return (
    <>
      <Card
        className={`${
          videoslug === video?.slug
            ? "bg-gray-300 dark:bg-gray-700"
            : "bg-gray-100 dark:bg-gray-800"
        }  hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-md overflow-hidden w-full p-2`}
      >
        <div className="flex justify-between items-center w-full gap-3">
          <div {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="w-[30%]">
            <div className="relative h-14">
              <Image
                src={video.thumbnailUrl}
                alt={video?.title}
                fill
                className="object-cover rounded-md"
              />
              {videoslug === video?.slug ? (
                <span className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
                  <AudioLines className="w-4 h-4 animate-pulse" />
                </span>
              ) : (
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
                  {formatDuration(video.duration)}
                </span>
              )}
            </div>
          </div>
          <CardContent className="px-2 space-y-2 w-[70%]">
            <h2 className="text-sm font-semibold truncate">{video.title}</h2>

            <div className="flex justify-between items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {video?.owner?.name || "Unknown"}
              </p>
              {videoslug === video?.slug ? (
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

export default PlaylistVideoCardMobile;
