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
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import NotLoggedInAlert from "../common/NotLoggedInAlert";

type Props = {
  id: string;
  totalLikes: number;
  totalDisLikes: number;
  actionType: "like" | "dislike";
  likes: string[];
  dislikes: string[];
};

const LikeDislikeVideo = ({
  id,
  totalLikes = 0,
  totalDisLikes = 0,
  actionType,
  likes = [],
  dislikes = [],
}: Props) => {
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const { data } = useGetLoggedInUserQuery({});
  const currentUser = data?.data as IUser;
  const alreadyLiked = likes.includes(currentUser?.id);
  const alreadyDisLiked = dislikes.includes(currentUser?.id);

  const [like, { isLoading: liking }] = useLikeToAVideoMutation();
  const [dislike, { isLoading: disliking }] = useDislikeAVideoMutation();

  const isLoading = actionType === "like" ? liking : disliking;

  const isLikedAction = actionType === "like";
  const alreadyPerformed = isLikedAction ? alreadyLiked : alreadyDisLiked;
  const count = isLikedAction ? totalLikes : totalDisLikes;

  const handleAction = async () => {
    if (!currentUser?.id) {
      setNotLoggedIn(true);
      return;
    }
    const mutation = isLikedAction ? like : dislike;
    await handleApiMutation(mutation, { id }, 200, {
      error: `Failed to ${actionType}`,
      success: `${actionType === "like" ? "Liked" : "Disliked"} video`,
    });
  };

  const displayText = alreadyPerformed
    ? isLikedAction
      ? "Liked"
      : "Disliked"
    : isLikedAction
    ? "Like"
    : "Dislike";

  const icon = isLikedAction ? (
    <ThumbsUp className={`w-4 h-4 ${alreadyLiked ? "text-blue-600" : ""}`} />
  ) : (
    <ThumbsDown
      className={`w-4 h-4 ${alreadyDisLiked ? "text-red-600" : ""}`}
    />
  );

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleAction}
            className="flex items-center gap-1 w-full"
            disabled={isLoading}
            size={"xs"}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
            <span className="text-sm lg:hidden">
              {isLoading ? "" : `(${count})`}
            </span>
            <span className="text-sm hidden lg:block">
              {isLoading ? "" : `${displayText} (${count})`}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {alreadyPerformed
            ? `You have ${displayText.toLowerCase()}`
            : `${displayText} this video`}
        </TooltipContent>
      </Tooltip>
      {notLoggedIn && (
        <NotLoggedInAlert
          open={notLoggedIn}
          onOpenChange={setNotLoggedIn}
          alertText="You must be logged in to like or dislike video. Please log in to continue."
        />
      )}
    </>
  );
};

export default LikeDislikeVideo;
