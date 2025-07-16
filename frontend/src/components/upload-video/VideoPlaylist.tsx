import { useGetLoggedInUserQuery } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { useGetPlaylistsByOwnerQuery } from "@/features/playlist";
import { IUser } from "@/types/user.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import CreatePlaylist from "../dashboard/playlist/CreatePlaylist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";

const VideoPlaylist = () => {
  const router = useRouter();
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const [isCreate, setIsCreate] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const { data, isLoading } = useGetPlaylistsByOwnerQuery({
    userId: user?.id || "",
  });

  const playlists = data?.data || [];

  const handleContinue = () => {
    localStorage.setItem("playlistId", JSON.stringify(selectedPlaylist));
    router.push("/video/create/thumbnail");
  };

  const handleSkip = () => {
    localStorage.removeItem("playlistId");
    router.push("/video/create/thumbnail");
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 p-2 lg:p-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Add to Playlist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            onValueChange={(value) => setSelectedPlaylist(value)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Select a playlist" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Your Playlists</SelectLabel>
                {playlists.length > 0 ? (
                  playlists.map((playlist) => (
                    <SelectItem key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-muted-foreground text-sm">
                    No playlists found.
                  </div>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex justify-between gap-2">
            <Button className="flex-1" onClick={() => setIsCreate(true)}>
              Create Playlist
            </Button>
            {selectedPlaylist ? (
              <Button onClick={handleContinue} className="flex-1">
                Continue
              </Button>
            ) : (
              <Button onClick={handleSkip} variant="ghost" className="flex-1">
                Skip for now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {isCreate && <CreatePlaylist open={isCreate} setOpen={setIsCreate} />}
    </>
  );
};

export default VideoPlaylist;
