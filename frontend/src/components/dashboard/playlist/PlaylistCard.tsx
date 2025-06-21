import { IPlaylist } from "@/types/playlist.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoIcon, CalendarClock } from "lucide-react";
import moment from "moment";

type Props = {
  playlist: IPlaylist;
};

const PlaylistCard = ({ playlist }: Props) => {
  return (
    <Card className="rounded-2xl shadow-md transition hover:shadow-xl duration-200 cursor-pointer bg-gray-200 dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold truncate">
          {playlist.name}
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
          <span>
            Created
            {moment(new Date(playlist.createdAt)).fromNow()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="w-4 h-4" />
          <span>Updated {moment(new Date(playlist.updatedAt)).fromNow()}</span>
        </div>

        <Button className="w-full mt-4 bg-gray-300 dark:bg-gray-700">
          View Playlist
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
