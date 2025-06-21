import { IPlaylist } from "@/types/playlist.type";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Shuffle, Repeat, Trash2 } from "lucide-react";

type Props = {
  playlist: IPlaylist;
};

const PlaylistHeader = ({ playlist }: Props) => {
  const { query } = useRouter();
  const currentVideoId = query?.id as string;

  const currentIndex = playlist?.videos?.findIndex(
    (v) => v.id === currentVideoId
  );
  const currentVideoNumber = currentIndex !== -1 ? currentIndex + 1 : "-";

  return (
    <div className="flex flex-col gap-2 p-2  border-b-gray-200 dark:border-b-gray-700 border-b">
      <h2 className="text-md lg:text-lg font-semibold tracking-tight truncate">
        {playlist?.name || ""}
      </h2>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Videos:</span>
        <span>
          {currentVideoNumber} of {playlist?.videos?.length || 0}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Repeat />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Loop Playlist</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Shuffle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Shuffle Playlist</TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete the playlist</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default PlaylistHeader;
