import { useGetChannelsStatsQuery } from "@/features/channel";
import { IChannelStats } from "@/types/channel.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ChannelsAnalytics = () => {
  const { data, isLoading } = useGetChannelsStatsQuery({});
  const stats = data?.data as IChannelStats;

  return (
    <div className="grid gap-2">
      {/* Stat Cards */}
      <h1 className="lg:text-2xl font-semibold my-2">Channels Statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-24 bg-gray-300 dark:bg-gray-700 w-full rounded-xl" />
            <Skeleton className="h-24 bg-gray-300 dark:bg-gray-700 w-full rounded-xl" />
          </>
        ) : (
          <>
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Total Channels</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {stats?.totalChannels ?? 0}
              </CardContent>
            </Card>
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Total Subscribers</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {stats?.totalSubscribers ?? 0}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Top Channels Chart */}
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Top Channels by Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-64 bg-gray-300 dark:bg-gray-700 w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={
                  stats?.topChannels.map((channel) => ({
                    ...channel,
                    name: channel?.name || "Unknown",
                  })) ?? []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="subscriberCount"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelsAnalytics;
