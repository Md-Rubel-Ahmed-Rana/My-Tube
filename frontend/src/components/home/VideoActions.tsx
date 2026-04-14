import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SaveToPlaylistModal from "../playlist-videos/SaveToPlaylistModal";
import { useState } from "react";
import ShareVideo from "../video/ShareVideo";
import WatchLaterAction from "./WatchLaterAction";
import { IFeedVideo } from "@/types/video.type";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { toast } from "sonner";

type Props = {
  video: IFeedVideo;
};

const VideoActions = ({ video }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});

  const user = userData?.data as IUser;
  const isAdmin = user && user?.role === "admin";
  const [isAddPlaylist, setIsAddPlaylist] = useState(false);

  const isInWatchLater = video?.isVideoOnWatchLater || false;

  const asPath = `/video/watch/${video.slug}/${
    video._id
  }?title=${encodeURIComponent(video.title)}`;

  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${asPath}` : "";

  const handleSaveToPlaylist = (e: any) => {
    if (!user?.id || !user?._id) {
      toast.info(
        "You are not logged in user. Please login to add video to your playlist",
      );
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    setIsAddPlaylist(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 bg-gray-200 dark:bg-gray-700"
        >
          {!isInWatchLater && !isAdmin && (
            <WatchLaterAction videoId={video?._id} />
          )}

          {!isAdmin && (
            <DropdownMenuItem
              className="cursor-pointer mb-2 bg-gray-200 dark:bg-gray-700 w-full hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={handleSaveToPlaylist}
            >
              <ListPlus className="mr-2 h-4 w-4" />
              Save to Playlist
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className=" bg-gray-200 cursor-pointer dark:bg-gray-700 w-full hover:bg-gray-300 dark:hover:bg-gray-600 ">
            <ShareVideo
              className="w-full flex justify-start hover:bg-gray-300 dark:hover:bg-gray-600"
              url={fullUrl}
              from="home"
              title={video?.title}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isAddPlaylist && (
        <SaveToPlaylistModal
          open={isAddPlaylist}
          setOpen={setIsAddPlaylist}
          videoId={video?._id}
        />
      )}
    </>
  );
};

export default VideoActions;
