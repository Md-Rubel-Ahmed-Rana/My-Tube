import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetVideosByChannelQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import VideoTable from "../videos/VideoTable";
import { useGetAllUserByAdminQuery } from "@/features/user";
import { IUser } from "@/types/user.type";

const VideosByChannel = () => {
  const { data: usersData } = useGetAllUserByAdminQuery({});
  const users = (usersData?.data || []) as IUser[];

  const [selectedChannel, setSelectedChannel] = useState<string>("");

  const { data, isLoading, isFetching } = useGetVideosByChannelQuery({
    channelId: selectedChannel,
  });

  const videos = data?.data as IVideo[];

  return (
    <div className="space-y-4 p-2 lg:p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold">
          Total Videos: {videos?.length || 0}
        </h2>

        <div className="w-full md:w-64">
          <Select
            value={selectedChannel}
            onValueChange={(value: string) => setSelectedChannel(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem
                  key={user?.id || user?._id}
                  value={user?.id || user?._id}
                >
                  {user?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <VideoTable videos={videos} isLoading={isLoading || isFetching} />
    </div>
  );
};

export default VideosByChannel;
