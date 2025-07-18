import { IPlaylist } from "@/types/playlist.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoIcon, CalendarClock } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import PlaylistEditModal from "./PlaylistEditModal";
import PlaylistDeleteModal from "./PlaylistDeleteModal";
import Link from "next/link";
import PlaylistActions from "./PlaylistActions";
import PlaylistNameStatuses from "./PlaylistNameStatuses";

type Props = {
  playlist: IPlaylist;
};

const PlaylistCard = ({ playlist }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <Card className="rounded-lg  py-2 px-0 shadow-md transition hover:shadow-xl duration-200 bg-gray-200 dark:bg-gray-800">
      <CardHeader className="px-2">
        <CardTitle className="text-xl font-semibold truncate">
          <div className="flex justify-between items-center">
            <PlaylistNameStatuses playlist={playlist} />
            <PlaylistActions playlist={playlist} />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-2">
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

        {playlist.videos.length > 0 ? (
          <Link
            href={`/playlist/watch/${playlist.slug}/video/${
              playlist.videos[0]?.slug
            }?title=${encodeURIComponent(playlist.videos[0]?.title)}`}
          >
            <Button className="w-full mt-4 bg-gray-300 dark:bg-gray-700">
              Watch Playlist
            </Button>
          </Link>
        ) : (
          <Link href={`/`}>
            <Button className="w-full mt-4 bg-gray-300 dark:bg-gray-700">
              Add Videos
            </Button>
          </Link>
        )}
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
