import { IUser } from "@/types/user.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";
import SubscriptionButton from "../video/SubscriptionButton";
import { useGetLoggedInUserQuery } from "@/features/auth";

type Props = {
  totalVideos: number;
  channel: IUser;
  isLoading: boolean;
};

const ChannelInfo = ({ totalVideos = 0, channel, isLoading }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  return (
    <Card className="w-full shadow-md rounded-md bg-gray-100 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl text-center lg:text-start  font-semibold">
          Welcome to the Channel
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
        {isLoading ? (
          <Skeleton className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700" />
        ) : (
          <Avatar className="h-16 w-16">
            <AvatarImage src={channel?.photo} alt="profile image" />
            <AvatarFallback>
              {formatNameForImageFallback(channel?.name)}
            </AvatarFallback>
          </Avatar>
        )}

        <div className="flex-1 space-y-2 text-center sm:text-left">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-full lg:w-1/4 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full lg:w-1/5 bg-gray-300 dark:bg-gray-700" />

              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-4 w-40 bg-gray-300 dark:bg-gray-700" />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-medium">{channel?.name}</h2>
              <span className="text-muted-foreground text-xs border rounded-md px-3 py-1 ">
                {user?.subscriptions || 0} subscribers
              </span>
              <p className="text-muted-foreground mt-1">
                @{channel?.username || "unknown username"}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap justify-center sm:justify-start">
                <Badge
                  className="text-gray-800 dark:text-gray-200"
                  variant="outline"
                >
                  Total Videos: {totalVideos}
                </Badge>
                <Badge
                  className="bg-gray-200 dark:bg-gray-700"
                  variant="secondary"
                >
                  Joined: {new Date(channel?.createdAt).toLocaleDateString()}
                </Badge>
              </div>

              {channel?.id !== user?.id && (
                <div className="pt-2">
                  <SubscriptionButton channelId={channel?.id} />
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelInfo;
