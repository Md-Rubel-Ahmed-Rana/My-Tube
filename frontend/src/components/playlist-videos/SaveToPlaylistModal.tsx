import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Video } from "lucide-react";
import { handleApiMutation } from "@/utils/handleApiMutation";
import {
  useAddVideoToPlaylistMutation,
  useGetPlaylistsByOwnerQuery,
} from "@/features/playlist";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import Link from "next/link";

type Props = {
  videoId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SaveToPlaylistModal = ({ videoId, open, setOpen }: Props) => {
  const { data: userDta } = useGetLoggedInUserQuery({});
  const user = userDta?.data as IUser;
  const { data } = useGetPlaylistsByOwnerQuery({
    userId: user?.id || "",
  });

  const playlists = data?.data || [];
  const [playlistId, setPlaylistId] = useState<string>("");
  const [addVideo, { isLoading }] = useAddVideoToPlaylistMutation();

  const handleClose = () => {
    setOpen(false);
    setPlaylistId("");
  };

  const handleAddToPlaylist = async () => {
    if (!playlistId) return;
    await handleApiMutation(addVideo, { playlistId, videoId }, 200, {
      error: "Failed to add video to playlist",
      success: "Video added to playlist successfully",
    });
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Video className="text-primary w-5 h-5" />
            <DialogTitle> Save to Playlist</DialogTitle>
          </div>
          {playlists.length > 0 && (
            <DialogDescription className="text-sm text-muted-foreground">
              Select a playlist to save this video into.
            </DialogDescription>
          )}
        </DialogHeader>

        {playlists.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 space-y-2">
            <p className="text-sm text-center text-muted-foreground">
              No playlists found.
            </p>
            <Link href={"/dashboard/playlists"}>
              <Button size={"sm"}>Create Playlist</Button>
            </Link>
          </div>
        ) : (
          <RadioGroup
            value={playlistId}
            onValueChange={(val) => setPlaylistId(val)}
            className="space-y-2 py-2"
          >
            {playlists.map((playlist) => (
              <div
                key={playlist?.id}
                className="flex items-center pl-3 space-x-2 border rounded-md cursor-pointer hover:bg-muted"
              >
                <RadioGroupItem value={playlist.id} id={playlist.id} />
                <Label
                  htmlFor={playlist.id}
                  className="cursor-pointer w-full py-2 pr-3"
                >
                  {playlist?.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {playlists?.length > 0 && (
          <div className="flex justify-end gap-2 pt-4">
            <Button
              onClick={handleClose}
              variant="secondary"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToPlaylist}
              disabled={isLoading || !playlistId}
            >
              {isLoading ? "Adding..." : "Add to Playlist"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SaveToPlaylistModal;
