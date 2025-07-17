import { IPlaylist, PlaylistStatus } from "@/types/playlist.type";
import { Eye, Lock, Ban, Trash2 } from "lucide-react";

type Props = {
  playlist: IPlaylist;
};

const PlaylistNameStatuses = ({ playlist }: Props) => {
  const renderStatusIcon = () => {
    switch (playlist.status) {
      case PlaylistStatus.PUBLIC:
        return <Eye className="w-4 h-4 text-green-500" />;
      case PlaylistStatus.PRIVATE:
        return <Lock className="w-4 h-4 text-yellow-500" />;
      case PlaylistStatus.BLOCKED:
        return <Ban className="w-4 h-4 text-red-500" />;
      case PlaylistStatus.DELETED:
        return <Trash2 className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {renderStatusIcon()}
      <h3 className="text-sm lg:text-lg font-semibold truncate">
        {playlist?.name || ""}
      </h3>
    </div>
  );
};

export default PlaylistNameStatuses;
