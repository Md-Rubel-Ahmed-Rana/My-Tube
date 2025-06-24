import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types/user.type";
import Link from "next/link";
import SubscriptionButton from "./SubscriptionButton";

type Props = {
  channel: IUser;
};

const ChannelCard = ({ channel }: Props) => {
  return (
    <div className="border rounded-lg lg:p-2 p-1">
      <div className="flex items-center lg:justify-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/channel/${channel?.slug}?name=${channel?.name}`}>
            <Avatar className="w-8 lg:w-10 h-8 lg:h-10">
              <AvatarImage
                src={channel?.photo || ""}
                alt={channel?.name || ""}
              />
              <AvatarFallback>
                {channel?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="space-y-1">
            <Link href={`/channel/${channel?.slug}?name=${channel?.name}`}>
              <h2 className="text-sm">{channel?.name || ""}</h2>
            </Link>
            <small className="text-muted-foreground">
              {channel?.subscriptions || 0} subscribers{" "}
            </small>
          </div>
        </div>
        <SubscriptionButton channelId={channel?.id} />
      </div>
    </div>
  );
};

export default ChannelCard;
