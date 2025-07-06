import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGetSingleVideoBySlugQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/utils/formatDuration";
import { formatBytes } from "@/utils/formatBytes";
import PlayVideo from "./PlayVideo";
import { useState } from "react";
import {
  Eye,
  ThumbsUp,
  ThumbsDown,
  Clock,
  FileText,
  Calendar,
} from "lucide-react";

const SingleVideoDetails = () => {
  const { query } = useRouter();
  const slug = query?.slug as string;
  const { data, isLoading } = useGetSingleVideoBySlugQuery({ slug });
  const video = data?.data as IVideo;
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  if (!video)
    return <div className="p-4 text-muted-foreground">Video not found.</div>;

  return (
    <div className="p-2 lg:p-4 space-y-4">
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-xl">🎬 {video.title}</CardTitle>
          <Button onClick={() => setOpen(true)}>▶ Play video</Button>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* Thumbnail */}
          <div>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          {/* Description & Tags */}
          <div className="space-y-4">
            <div className="text-muted-foreground">{video.description}</div>

            {video.tags.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">📊 Video Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-muted-foreground">
          <Metric icon={<Eye size={16} />} label="Views" value={video.views} />
          <Metric
            icon={<ThumbsUp size={16} />}
            label="Likes"
            value={video.likes.length}
          />
          <Metric
            icon={<ThumbsDown size={16} />}
            label="Dislikes"
            value={video.dislikes.length}
          />
          <Metric
            icon={<Clock size={16} />}
            label="Duration"
            value={`${formatDuration(video.duration)} sec`}
          />
          <Metric
            icon={<FileText size={16} />}
            label="Size"
            value={formatBytes(video.size)}
          />
          <Metric
            icon={<Calendar size={16} />}
            label="Uploaded"
            value={format(new Date(video.createdAt), "PPP")}
          />
          <Metric
            icon={<Calendar size={16} />}
            label="Updated"
            value={format(new Date(video.updatedAt), "PPP")}
          />
        </CardContent>
      </Card>

      {/* Uploader */}
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">👤 Uploader Info</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 text-muted-foreground">
          <p>
            <span className="font-medium">Name:</span> {video.owner?.name}
          </p>
          <p>
            <span className="font-medium">Username:</span>{" "}
            {video.owner?.username}
          </p>
          <p>
            <span className="font-medium">Email:</span> {video.owner?.email}
          </p>
        </CardContent>
      </Card>

      {/* Video Player Modal */}
      {open && (
        <PlayVideo open={open} setOpen={setOpen} videoUrl={video.videoUrl} />
      )}
    </div>
  );
};

const Metric = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-primary">{icon}</span>
    <span className="text-sm">{label}:</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default SingleVideoDetails;
