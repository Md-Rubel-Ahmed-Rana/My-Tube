import { useGetVideosByOwnerQuery } from "@/features/videos";
import DashboardHeader from "../DashboardHeader";
import MyVideos from "./MyVideos";
import { IVideo } from "@/types/video.type";
import VideoLoadingSkeleton from "@/skeletons/VideoLoading.skeleton";
import DashboardItems from "../DashboardItems";

const Dashboard = () => {
  const { data, isLoading } = useGetVideosByOwnerQuery({});
  const videos = (data?.data || []) as IVideo[];
  return (
    <div className="p-2 lg:p-3 flex flex-col gap-2">
      <DashboardHeader totalVideos={videos?.length || 0} />
      <DashboardItems />
      {isLoading ? <VideoLoadingSkeleton /> : <MyVideos videos={videos} />}
    </div>
  );
};

export default Dashboard;
