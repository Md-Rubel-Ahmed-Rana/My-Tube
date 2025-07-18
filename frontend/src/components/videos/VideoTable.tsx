import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import VideoActions from "./VideoActions";
import { IVideo } from "@/types/video.type";
import VideoLoadingTableSkeleton from "@/skeletons/VideoLoadingTable.skeleton";
import { formatDuration } from "@/utils/formatDuration";
import { formatBytes } from "@/utils/formatBytes";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";

type Props = {
  videos: IVideo[];
  isLoading: boolean;
};

const VideoTable = ({ videos = [], isLoading }: Props) => {
  return (
    <div className="border rounded-xl shadow-sm">
      {isLoading ? (
        <VideoLoadingTableSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="dark:text-gray-200 text-gray-800">
                Title
              </TableHead>
              <TableHead className="dark:text-gray-200 text-gray-800">
                Owner
              </TableHead>
              <TableHead className="text-center dark:text-gray-200 text-gray-800">
                Duration
              </TableHead>
              <TableHead className="text-center dark:text-gray-200 text-gray-800">
                Size
              </TableHead>
              <TableHead className="text-center dark:text-gray-200 text-gray-800">
                Status
              </TableHead>
              <TableHead className="text-center dark:text-gray-200 text-gray-800">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="dark:text-gray-200 text-gray-800">
            {videos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  No videos found.
                </TableCell>
              </TableRow>
            ) : (
              videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell
                    className="truncate font-medium"
                    title={video?.title}
                  >
                    {truncateText(video?.title)}
                  </TableCell>

                  <TableCell>{video?.owner?.name || "Unknown"}</TableCell>
                  <TableCell className="text-center">
                    {formatDuration(video?.duration || 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatBytes(video?.size || 0)}
                  </TableCell>
                  <TableCell className="text-center">{video?.status}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Link
                      href={`/admin/dashboard/videos/details/${video?.slug}?title=${video?.title}`}
                    >
                      <Button size="sm">Details</Button>
                    </Link>
                    <VideoActions video={video} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default VideoTable;
