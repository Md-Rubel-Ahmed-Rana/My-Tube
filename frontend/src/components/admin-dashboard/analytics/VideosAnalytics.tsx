import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVideosStatsQuery } from "@/features/videos";
import { IVideoStats } from "@/types/video.type";
import { formatBytes } from "@/utils/formatBytes";

const VideosAnalytics = () => {
  const { data, isLoading } = useGetVideosStatsQuery({});
  const stats = data?.data as IVideoStats;

  const statusChartData =
    stats &&
    Object.entries(stats.videosByStatus).map(([status, count]) => ({
      status,
      count,
    }));

  return (
    <div>
      <h1 className="lg:text-2xl font-semibold">Video Statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </>
        ) : (
          <>
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Total Videos</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {stats.totalVideos}
              </CardContent>
            </Card>
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Total Views</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {stats.totalViews}
              </CardContent>
            </Card>
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Total Likes</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {stats.totalLikes}
              </CardContent>
            </Card>
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Total Size</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {formatBytes(stats?.totalSize || 0)}
              </CardContent>
            </Card>
          </>
        )}

        <div className="col-span-1 sm:col-span-2 lg:col-span-4">
          <Card className="h-80 bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Videos by Status</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              {isLoading ? (
                <Skeleton className="w-full h-full rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusChartData}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideosAnalytics;
