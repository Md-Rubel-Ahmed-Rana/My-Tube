import { IPlaylist } from "@/types/playlist.type";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Shuffle, Repeat, Trash2, Repeat1 } from "lucide-react";
import { useState } from "react";
import PlaylistDeleteModal from "../dashboard/playlist/PlaylistDeleteModal";

type Props = {
  playlist: IPlaylist;
  shouldLoopAVideo: boolean;
  isShuffle: boolean;
  setShouldLoopAVideo: (value: boolean) => void;
  setIsShuffle: (value: boolean) => void;
};

const PlaylistHeader = ({
  playlist,
  setShouldLoopAVideo,
  shouldLoopAVideo,
  isShuffle,
  setIsShuffle,
}: Props) => {
  const { query } = useRouter();
  const currentVideoId = query?.id as string;
  const [isDeletePlayList, setIsDeletePlayList] = useState(false);

  const currentIndex = playlist?.videos?.findIndex(
    (v) => v.id === currentVideoId
  );
  const currentVideoNumber = currentIndex !== -1 ? currentIndex + 1 : "-";

  const handleLoopVideo = () => {
    setShouldLoopAVideo(!shouldLoopAVideo);
    setIsShuffle(false);
  };

  const handleShuffleVideo = () => {
    setIsShuffle(!isShuffle);
    setShouldLoopAVideo(false);
  };

  return (
    <div className="flex flex-col gap-2 p-2  border-b-gray-200 dark:border-b-gray-700 border-b">
      <h2 className="text-md lg:text-lg font-semibold tracking-tight truncate">
        {playlist?.name || ""}
      </h2>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Playing:</span>
        <span>
          {currentVideoNumber} of {playlist?.videos?.length || 0}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLoopVideo}
                size="icon"
                className={
                  shouldLoopAVideo
                    ? "bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
                    : "text-muted-foreground"
                }
              >
                {shouldLoopAVideo ? (
                  <Repeat1 className={"text-white"} />
                ) : (
                  <Repeat className={"text-muted-foreground"} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {shouldLoopAVideo ? "Looping enabled" : "Loop a video"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleShuffleVideo}
                size="icon"
                className={
                  isShuffle
                    ? "bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
                    : "text-muted-foreground"
                }
              >
                <Shuffle
                  className={isShuffle ? "text-white" : "text-muted-foreground"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Shuffle Playlist</TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => setIsDeletePlayList(true)} size="icon">
              <Trash2 className="text-red-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete the playlist</TooltipContent>
        </Tooltip>
      </div>
      {isDeletePlayList && (
        <PlaylistDeleteModal
          open={isDeletePlayList}
          id={playlist?.id}
          setOpen={setIsDeletePlayList}
        />
      )}
    </div>
  );
};

export default PlaylistHeader;
