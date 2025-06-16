import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes } from "@/utils/formatBytes";

type Props = {
  video: File;
};

const VideoPreviewCard = ({ video }: Props) => {
  const videoUrl = URL.createObjectURL(video);

  return (
    <Card className="w-full max-w-md p-2 rounded-md overflow-hidden shadow-sm">
      <CardHeader className="p-0">
        <CardTitle className="text-base truncate">{video.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 p-0">
        <div className="relative w-full overflow-hidden rounded-md border">
          <video
            src={videoUrl}
            controls
            className="w-full h-auto max-h-36 lg:max-h-40 object-cover"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Size: {formatBytes(video.size)}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreviewCard;
