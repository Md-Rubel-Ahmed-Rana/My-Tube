import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useGetTopChannelsQuery } from "@/features/channel";
import { ITopChannel } from "@/types/channel.type";
import TopChannelsLoadingSkeleton from "@/skeletons/TopChannelsLoading.skeleton";

const TopChannels = () => {
  const { data, isLoading } = useGetTopChannelsQuery({});
  const channels = (data?.data || []) as ITopChannel[];
  return (
    <Card className="p-2 bg-gray-200 dark:bg-gray-800">
      <h2 className="text-sm font-semibold px-2 pb-2">Top Channels</h2>
      {!isLoading ? (
        <TopChannelsLoadingSkeleton />
      ) : (
        <ScrollArea className="max-h-[300px] h-full pr-2">
          <ul className="space-y-2">
            {channels.map((channel) => (
              <li
                key={channel?.id}
                className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-muted cursor-pointer transition"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      channel?.photo ||
                      `https://api.dicebear.com/8.x/initials/svg?seed=${channel?.name}`
                    }
                    alt={channel.name}
                  />
                  <AvatarFallback>{channel?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-sm truncate">{channel?.name}</span>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-xs truncate">
                      Videos {channel?.videoCount}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-500" />
                    <span className="text-xs truncate">
                      Subscribers{channel?.subscriberCount}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </Card>
  );
};

export default TopChannels;
