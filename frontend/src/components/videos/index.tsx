import { useState } from "react";
import { useGetAllVideosByAdminQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import VideoControls from "./VideoControls";
import VideoTable from "./VideoTable";

const AdminVideos = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 10;

  const { data, isLoading, isFetching } = useGetAllVideosByAdminQuery(
    { page, limit, searchText },
    { refetchOnMountOrArgChange: true }
  );

  const videos = (data?.data?.videos || data?.data || []) as IVideo[];
  const total = (data?.data?.total || 0) as number;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Total Videos : {total}</h2>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
      </div>

      <VideoControls
        limit={limit}
        page={page}
        setPage={setPage}
        total={total}
        totalPages={totalPages}
        setSearchText={setSearchText}
      />

      <VideoTable videos={videos} isLoading={isLoading || isFetching} />
    </div>
  );
};

export default AdminVideos;
