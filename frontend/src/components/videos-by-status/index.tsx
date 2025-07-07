import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetVideosByStatusQuery } from "@/features/videos";
import { IVideo, VideoStatus } from "@/types/video.type";
import VideoTable from "../videos/VideoTable";

const VideosByStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState<VideoStatus>(
    VideoStatus.PUBLISHED
  );

  const { data, isLoading, isFetching } = useGetVideosByStatusQuery({
    status: selectedStatus,
  });

  const videos = data?.data as IVideo[];

  return (
    <div className="space-y-4 p-2 lg:p-4 dark:text-gray-200 text-gray-800">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold">
          Total Videos: {videos?.length || 0}
        </h2>

        <div className="w-full md:w-64">
          <Select
            value={selectedStatus}
            onValueChange={(value: VideoStatus) => setSelectedStatus(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(VideoStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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

export default VideosByStatus;
