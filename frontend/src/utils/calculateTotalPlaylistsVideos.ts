import { IPlaylist } from "@/types/playlist.type";

export const calculateTotalPlaylistsVideos = (
  playlists: IPlaylist[] = []
): number => {
  let totalVideos = 0;
  playlists.forEach((playlist) => {
    totalVideos += playlist?.videos?.length || 0;
  });
  return totalVideos;
};
