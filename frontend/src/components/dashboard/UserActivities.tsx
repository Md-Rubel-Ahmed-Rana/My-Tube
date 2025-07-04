/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Eye,
  Clock,
  ThumbsUp,
  MessageCircle,
  Upload,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = {
  videosWatched: 152,
  minutesWatched: 340,
  likesGiven: 68,
  commentsMade: 14,
  videosUploaded: 5,
  subscribers: 102,
  watchTrend: [
    { date: "Jul 1", minutes: 30 },
    { date: "Jul 2", minutes: 50 },
    { date: "Jul 3", minutes: 40 },
    { date: "Jul 4", minutes: 70 },
    { date: "Jul 5", minutes: 10 },
    { date: "Jul 6", minutes: 20 },
    { date: "Jul 7", minutes: 100 },
  ],
};

const StatCard = ({ icon: Icon, label, value }: any) => (
  <Card className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 gap-3 px-0 py-1 shadow-sm rounded-xl">
    <Icon className="w-6 h-6 text-blue-500" />
    <div className="flex flex-col justify-center items-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </Card>
);

const UserActivities = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">Your Activity</h3>
        <SidebarTrigger />
      </div>

      <div className="grid grid-cols-2 gap-1">
        <StatCard
          icon={Eye}
          label="Videos Watched"
          value={data.videosWatched}
        />
        <StatCard
          icon={Clock}
          label="Minutes Watched"
          value={data.minutesWatched}
        />
        <StatCard icon={ThumbsUp} label="Likes Given" value={data.likesGiven} />
        <StatCard
          icon={MessageCircle}
          label="Comments"
          value={data.commentsMade}
        />
        <StatCard icon={Upload} label="Uploads" value={data.videosUploaded} />
        <StatCard icon={Users} label="Subscribers" value={data.subscribers} />
      </div>

      <Card className="py-2 px-1  bg-gray-200 dark:bg-gray-700  ">
        <CardHeader>
          <CardTitle className="text-xs">Watch Time (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.watchTrend}
              margin={{ top: 0, right: 5, left: -30, bottom: 0 }}
            >
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="minutes"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivities;
