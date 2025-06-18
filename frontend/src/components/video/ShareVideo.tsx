import { useRouter } from "next/router";
import { Share2 } from "lucide-react";
import { RWebShare } from "react-web-share";
import { Button } from "@/components/ui/button";

const ShareVideo = () => {
  const router = useRouter();

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${router.asPath}`
      : "";

  return (
    <RWebShare
      data={{
        title: "Check out this video!",
        text: "Watch this awesome video on MyTube.",
        url: fullUrl,
      }}
    >
      <Button
        title="Share with others"
        size="xs"
        className="flex items-center gap-1 w-full"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm hidden lg:block">Share</span>
      </Button>
    </RWebShare>
  );
};

export default ShareVideo;
