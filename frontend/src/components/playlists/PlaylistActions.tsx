import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PLAYLIST_STATUSES } from "@/types/playlist.type";
import { MoreHorizontal } from "lucide-react";

type Props = {
  status: string;
};

const PlaylistActions = ({ status }: Props) => {
  const statuses = PLAYLIST_STATUSES.filter(
    (sts) => sts.trim().toLowerCase() !== status.trim().toLowerCase()
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statuses.map((value) => (
          <DropdownMenuItem key={value}> {value}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlaylistActions;
