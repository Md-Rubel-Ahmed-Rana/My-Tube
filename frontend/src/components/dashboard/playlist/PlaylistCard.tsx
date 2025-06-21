import { IPlaylist } from "@/types/playlist.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

import { VideoIcon, CalendarClock } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import PlaylistEditModal from "./PlaylistEditModal";
import PlaylistDeleteModal from "./PlaylistDeleteModal";

type Props = {
  playlist: IPlaylist;
};

const PlaylistCard = ({ playlist }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <Card className="rounded-2xl shadow-md transition hover:shadow-xl duration-200 cursor-pointer bg-gray-200 dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold truncate">
          <div className="flex justify-between items-center">
            <h3 className="text-sm lg:text-lg font-semibold truncate">
              {playlist?.name || ""}
            </h3>
            <div className="flex items-center">
              <Button
                onClick={() => setIsEdit(true)}
                variant="ghost"
                size="icon"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsDelete(true)}
                variant="ghost"
                size="icon"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <VideoIcon className="w-4 h-4" />
          <span>
            {playlist.videos.length}{" "}
            {playlist.videos.length === 1 ? "video" : "videos"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="w-4 h-4" />
          <span>Created: </span>
          <span>{moment(new Date(playlist.createdAt)).fromNow()}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="w-4 h-4" />
          <span>Updated: </span>
          <span>{moment(new Date(playlist.updatedAt)).fromNow()}</span>
        </div>

        <Button className="w-full mt-4 bg-gray-300 dark:bg-gray-700">
          View Playlist
        </Button>
      </CardContent>
      {isEdit && (
        <PlaylistEditModal
          open={isEdit}
          setOpen={setIsEdit}
          playlist={{ id: playlist?.id, name: playlist?.name }}
        />
      )}

      {isDelete && (
        <PlaylistDeleteModal
          open={isDelete}
          setOpen={setIsDelete}
          id={playlist?.id}
        />
      )}
    </Card>
  );
};

export default PlaylistCard;
