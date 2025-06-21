import { useRouter } from "next/router";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

type Props = {
  url?: string;
  className?: string;
  from?: "home" | "playlist" | "channel";
};

const ShareVideo = ({ url, className, from }: Props) => {
  const router = useRouter();

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${router.asPath}`
      : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this video on MyTube!",
          url: url || fullUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Failed to share the video.");
      }
    } else {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Link copied to clipboard.");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleShare} size="xs" className={`${className} px-5`}>
          <Share2 className="w-4 h-4" />
          <span className={`${from === "home" ? "block" : "hidden"}  lg:block`}>
            Share
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Share this video</TooltipContent>
    </Tooltip>
  );
};

export default ShareVideo;
