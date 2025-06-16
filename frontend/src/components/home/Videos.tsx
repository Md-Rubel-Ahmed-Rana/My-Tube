import { useGetVideosQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import VideoCard from "./VideoCard";

const Videos = () => {
  const { data, isLoading } = useGetVideosQuery({});
  const videos = (data?.data?.videos || []) as IVideo[];
  return (
    <>
      {isLoading ? (
        <div className="text-center w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-2xl">Videos loading...</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {videos?.map((video) => (
            <VideoCard key={video?.id} video={video} />
          ))}
        </div>
      )}
    </>
  );
};

export default Videos;
