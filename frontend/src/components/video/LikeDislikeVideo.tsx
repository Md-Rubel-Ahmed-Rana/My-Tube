import { ThumbsUp, Loader2, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useDislikeAVideoMutation,
  useLikeToAVideoMutation,
} from "@/features/videos";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  id: string;
  totalLikes: number;
  totalDisLikes: number;
  actionType: "like" | "dislike";
};

const LikeDislikeVideo = ({
  id,
  totalLikes = 0,
  totalDisLikes = 0,
  actionType,
}: Props) => {
  const [like, { isLoading: liking }] = useLikeToAVideoMutation();
  const [dislike, { isLoading: disliking }] = useDislikeAVideoMutation();

  const isLoading: boolean = actionType === "like" ? liking : disliking;
  const actionText: string = actionType === "like" ? "Like" : "Dislike";
  const actionCount: number =
    actionText === "Like" ? totalLikes : totalDisLikes;
  const icon =
    actionType === "like" ? (
      <ThumbsUp className="w-4 h-4" />
    ) : (
      <ThumbsDown className="w-4 h-4" />
    );

  const handleLikeAVideo = async () => {
    const mutation = actionType === "like" ? like : dislike;
    await handleApiMutation(mutation, { id }, 200, {
      error: "Failed to like",
      success: "Liked video",
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleLikeAVideo}
          className="flex items-center gap-1 w-full"
          disabled={isLoading}
          size={"xs"}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
          <span className="text-sm  lg:hidden">
            {isLoading ? "" : `(${actionCount})`}
          </span>
          <span className="text-sm hidden lg:block">
            {isLoading ? "" : `${actionText} (${actionCount})`}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{actionText} this video</TooltipContent>
    </Tooltip>
  );
};

export default LikeDislikeVideo;
