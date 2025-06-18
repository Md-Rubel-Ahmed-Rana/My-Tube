import { ThumbsUp, Loader2 } from "lucide-react"; // Import spinner icon
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLikeToAVideoMutation } from "@/features/videos";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  id: string;
  totalLikes: number;
};

const LikeVideo = ({ id, totalLikes = 0 }: Props) => {
  const [like, { isLoading }] = useLikeToAVideoMutation();

  const handleLikeAVideo = async () => {
    await handleApiMutation(like, { id }, 200, {
      error: "Failed to like",
      success: "Liked video",
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleLikeAVideo}
          className="flex items-center gap-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ThumbsUp className="w-4 h-4" />
          )}
          <span className="text-sm">
            {isLoading ? "" : `Like (${totalLikes})`}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Like this video</TooltipContent>
    </Tooltip>
  );
};

export default LikeVideo;
