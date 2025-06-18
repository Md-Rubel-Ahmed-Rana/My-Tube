/* eslint-disable @typescript-eslint/no-explicit-any */
import { Download, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IVideo } from "@/types/video.type";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { formatBytes } from "@/utils/formatBytes";

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

  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleDownloadVideo = async () => {
    setIsLoading(true);
    setProgress(0);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(video.videoUrl, {
        signal: abortControllerRef.current.signal,
      });

      const contentLength = response.headers.get("Content-Length");
      if (!response.body || !contentLength) {
        throw new Error("Stream not supported or content length unavailable");
      }

      const total = parseInt(contentLength, 10);
      let loaded = 0;
      const reader = response.body.getReader();
      readerRef.current = reader;

      const chunks: Uint8Array[] = [];

      let fullyDownloaded = true;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        if (value) {
          chunks.push(value);
          loaded += value.length;
          const percent = Math.floor((loaded / total) * 100);
          setProgress(percent);
        }
      }

      // If we reached here, we successfully downloaded the full content
      if (loaded === total) {
        const blob = new Blob(chunks);
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } else {
        fullyDownloaded = false;
      }

      if (!fullyDownloaded) {
        toast.warning("Download incomplete. File was not saved.");
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        toast.warning("Download canceled.");
      } else {
        toast.error("Failed to download video.");
        console.error("Download error:", error);
      }
    } finally {
      setIsLoading(false);
      setProgress(0);
      readerRef.current = null;
      abortControllerRef.current = null;
    }
  };

  const handleCancelDownload = () => {
    if (readerRef.current) {
      readerRef.current.cancel();
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={isLoading ? handleCancelDownload : handleDownloadVideo}
          size="xs"
          className="flex items-center gap-1 w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm hidden lg:inline">
                Cancel ({progress}%)
              </span>
              <span className="text-sm  lg:hidden">({progress}%)</span>
              <X className="w-4 h-4 lg:hidden" />
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span className="text-sm hidden lg:inline">Download</span>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isLoading
          ? "Cancel download"
          : `Download video (${formatBytes(video?.size)})`}
      </TooltipContent>
    </Tooltip>
  );
};

export default DownloadVideo;
