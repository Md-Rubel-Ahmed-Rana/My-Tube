import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.type";
import Link from "next/link";

type Props = {
  channel: IUser;
};

const ChannelCard = ({ channel }: Props) => {
  return (
    <div className="border rounded-lg p-2">
      <div className="flex items-center gap-4 pb-2">
        <Avatar className="w-10 lg:w-14 h-10 lg:h-14">
          <AvatarImage src={channel?.photo} alt={channel?.name} />
          <AvatarFallback>
            {channel?.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-lg">{channel?.name}</h2>
          <p className="text-sm text-muted-foreground">@{channel?.username}</p>
          <Link
            href={`/channel/${channel?.username}/${channel?.id}?name=${channel?.name}`}
          >
            <Button size="sm">View Channel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
