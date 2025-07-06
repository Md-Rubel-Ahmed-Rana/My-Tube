/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useGetUserStatsQuery } from "@/features/user";
import { IUserStat } from "@/types/user.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const UserAnalytics = () => {
  const { data, isLoading } = useGetUserStatsQuery({});
  const userStats = (data?.data || []) as IUserStat[];
  const [selectedUser, setSelectedUser] = useState<IUserStat | null>(null);

  useEffect(() => {
    if (!selectedUser && userStats.length > 0) {
      setSelectedUser(userStats[0]);
    }
  }, [userStats, selectedUser]);

  const chartData = selectedUser
    ? [
        { name: "Videos", value: selectedUser.totalVideos },
        { name: "Playlists", value: selectedUser.totalPlaylists },
        { name: "Subscribed", value: selectedUser.totalSubscribedChannels },
        { name: "Subscribers", value: selectedUser.totalSubscribers },
      ]
    : [];

  if (isLoading || userStats.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-32 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Table */}
      <Card className="bg-gray-100 dark:bg-gray-800 max-h-[500px] overflow-y-auto">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 z-10">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Videos</th>
              </tr>
            </thead>
            <tbody>
              {userStats.map((user) => (
                <tr
                  key={user._id}
                  className={cn(
                    "cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition",
                    selectedUser?._id === user._id &&
                      "bg-gray-300 dark:bg-gray-700"
                  )}
                  onClick={() => setSelectedUser(user)}
                  onMouseEnter={() => setSelectedUser(user)}
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {user.username}
                  </td>
                  <td className="px-4 py-2">{user.totalVideos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Right Chart */}
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>{selectedUser?.name}&apos;s Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedUser ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground">No user selected</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAnalytics;
