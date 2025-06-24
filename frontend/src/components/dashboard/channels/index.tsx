import { useMyChannelsQuery } from "@/features/channel";
import { IUser } from "@/types/user.type";
import { Skeleton } from "@/components/ui/skeleton";
import ChannelCard from "./ChannelCard";
import NoChannelSubscribed from "./NoChannelSubscribed";

const Channels = () => {
  const { data, isLoading } = useMyChannelsQuery({});
  const channels = (data?.data || []) as IUser[];

  console.log(channels);

  return (
    <div className="p-2 lg:p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Your Subscribed Channels</h2>
        <p className="text-sm text-muted-foreground">
          Here are the channels you&apos;re currently subscribed to. Stay
          updated with their latest content.
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-[120px] w-full rounded-xl bg-gray-300 dark:bg-gray-700"
            />
          ))}
        </div>
      ) : (
        <>
          {channels.length <= 0 ? (
            <NoChannelSubscribed />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {channels.map((channel) => (
                <ChannelCard
                  key={channel?.id || channel?._id}
                  channel={channel}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Channels;
