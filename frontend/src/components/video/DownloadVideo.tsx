import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IVideo } from "@/types/video.type";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  video: IVideo;
};

const DownloadVideo = ({ video }: Props) => {
  const date = new Date();
  const todayDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const fileName = `MyTube-${video?.title}-${todayDate}-${date.getTime()}.mp4`;

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownloadVideo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(video.videoUrl);

      const contentLength = response.headers.get("Content-Length");
      if (!response.body || !contentLength) {
        throw new Error("Stream not supported or content length unavailable");
      }

      const total = parseInt(contentLength, 10);
      let loaded = 0;
      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          loaded += value.length;

          const progress = Math.floor((loaded / total) * 100);
          setProgress(progress);
        }
      }

      const blob = new Blob(chunks);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Failed to download video.");
      console.error("Download error:", error);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleDownloadVideo}
          size="xs"
          className="flex items-center gap-1 w-1/6 lg:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm hidden lg:inline">
                Downloading ({progress}%)
              </span>
              <span className="text-sm lg:hidden inline">({progress}%)</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span className="text-sm hidden lg:inline">Download</span>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Download video</TooltipContent>
    </Tooltip>
  );
};

export default DownloadVideo;
