import { IUser } from "@/types/user.type";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import moment from "moment";
import { UnsubscribeButton } from "./UnsubscribeButton";

type Props = {
  channel: IUser;
};

const ChannelCard = ({ channel }: Props) => {
  return (
    <Card key={channel.id} className="p-4 bg-gray-200 dark:bg-gray-800">
      <CardContent className="flex items-center gap-4 p-0">
        <Avatar className="h-14 w-14">
          <AvatarImage src={channel?.photo} alt={channel?.name} />
          <AvatarFallback>{channel?.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="text-lg font-semibold">{channel?.name}</div>
          <div className="text-sm text-muted-foreground">
            @{channel?.username}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {channel?.subscriptions || 0} subscribers
          </div>
          <div className="text-xs text-muted-foreground">
            Joined {moment(new Date(channel.createdAt)).fromNow()}
          </div>
          <UnsubscribeButton channelId={channel?.id || channel?._id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
