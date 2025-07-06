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
  Home,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ModeToggle } from "../common/ModeToggle";
import { useGetUserActivitiesQuery } from "@/features/user";
import { IUserActivityStats } from "@/types/user.type";
import UserActivityLoadingSkeleton from "@/skeletons/UserActivityLoading.skeleton";
import Link from "next/link";

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
  const { data: response, isLoading } = useGetUserActivitiesQuery({});
  const activities = response?.data as IUserActivityStats;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold">Your Activity</h3>
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <Home className="h-5 w-5" />
          </Link>
          <ModeToggle />
          <SidebarTrigger />
        </div>
      </div>

      {isLoading ? (
        <UserActivityLoadingSkeleton />
      ) : (
        <>
          {!activities ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="text-sm">No activities</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-1">
                <StatCard
                  icon={Eye}
                  label="Videos Watched"
                  value={activities?.videosWatched || 0}
                />
                <StatCard
                  icon={Clock}
                  label="Minutes Watched"
                  value={activities?.minutesWatched || 0}
                />
                <StatCard
                  icon={ThumbsUp}
                  label="Likes Given"
                  value={activities?.likesGiven || 0}
                />
                <StatCard
                  icon={MessageCircle}
                  label="Comments"
                  value={activities?.commentsMade || 0}
                />
                <StatCard
                  icon={Upload}
                  label="Uploads"
                  value={activities?.videosUploaded || 0}
                />
                <StatCard
                  icon={Users}
                  label="Subscribers"
                  value={activities?.subscribers || 0}
                />
              </div>
              <Card className="py-2 px-1  bg-gray-200 dark:bg-gray-700  ">
                <CardHeader>
                  <CardTitle className="text-xs">
                    Watch Time (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] p-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activities?.watchTrend || []}
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserActivities;
