import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCommentsStatsQuery } from "@/features/comment";
import { ICommentStats } from "@/types/comment.type";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

const COLORS = ["#34D399", "#F87171", "#60A5FA", "#FBBF24"];

const CommentsAnalytics = () => {
  const { data, isLoading } = useGetCommentsStatsQuery({});
  const stats = data?.data as ICommentStats;

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-44 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Total Comments */}
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Total Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalCount}
          </p>
        </CardContent>
      </Card>

      {/* Status Distribution (Pie Chart) */}
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Comment Status</CardTitle>
        </CardHeader>
        <CardContent className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.statusDistribution}
                dataKey="count"
                nameKey="status"
                outerRadius={60}
                label
              >
                {stats.statusDistribution.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Top Commenters</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.topCommenters}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Most Commented Videos (List) */}
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Most Commented Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {stats.mostCommentedVideos.map((video) => (
              <li
                key={video.id}
                className="flex justify-between border-b pb-1 last:border-none"
              >
                <span className={cn("truncate max-w-[75%]")}>
                  {video.title}
                </span>
                <span className="text-muted-foreground font-medium">
                  {video.count}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsAnalytics;
