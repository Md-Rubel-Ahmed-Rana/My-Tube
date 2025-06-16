import { useGetVideosByOwnerQuery } from "@/features/videos";
import DashboardHeader from "./DashboardHeader";
import MyVideos from "./MyVideos";
import { IVideo } from "@/types/video.type";

const Dashboard = () => {
  const { data, isLoading } = useGetVideosByOwnerQuery({});
  const videos = (data?.data || []) as IVideo[];
  return (
    <div className="p-2 lg:p-3 flex flex-col gap-2">
      <DashboardHeader totalVideos={videos?.length || 0} />
      {isLoading ? (
        <div className="text-center mt-5">
          <h2>Videos loading...</h2>
        </div>
      ) : (
        <MyVideos videos={videos} />
      )}
    </div>
  );
};

export default Dashboard;
