import { IPlaylist } from "@/types/playlist.type";
import PlaylistCard from "./PlaylistCard";

type Props = {
  playlists: IPlaylist[];
};

const PlaylistContainer = ({ playlists }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist?.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistContainer;
