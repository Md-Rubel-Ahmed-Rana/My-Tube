import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/router";
import { toast } from "sonner";

const CopyLink = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const fullUrl = `${window.location.origin}${router.asPath}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Video link copied to clipboard");
    } catch {
      toast.error("Failed to copy the link");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="xs"
          onClick={handleCopyLink}
          className="flex items-center gap-1 w-full"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          <span className="text-sm hidden lg:block">
            {copied ? "Copied" : "Copy Link"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied!" : "Copy video link"}</TooltipContent>
    </Tooltip>
  );
};

export default CopyLink;
