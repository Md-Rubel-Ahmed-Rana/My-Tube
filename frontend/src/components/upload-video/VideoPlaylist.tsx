/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetLoggedInUserQuery } from "@/features/auth";
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any>;
  isLoading: boolean;
};

const VideoPlaylist = ({ form, isLoading }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;

  const { data, isLoading: isPlaylistLoading } = useGetPlaylistsByOwnerQuery({
    userId: user?.id || "",
  });

  const playlists = data?.data || [];

  return (
    <FormField
      control={form.control}
      name="playlistId"
      disabled={isLoading || isPlaylistLoading}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Video Playlist</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a playlist" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Playlists</SelectLabel>
                  {playlists.map((playlist) => (
                    <SelectItem key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default VideoPlaylist;
