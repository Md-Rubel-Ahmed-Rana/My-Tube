import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useAddToWatchLaterMutation } from "@/features/watch-later";
import { IUser } from "@/types/user.type";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { Clock } from "lucide-react";
import { toast } from "sonner";

type Props = {
  videoId: string;
};

const WatchLaterAction = ({ videoId }: Props) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [add, { isLoading }] = useAddToWatchLaterMutation();
  const handleAddToWatchLater = async () => {
    if (!user?.id || !user?._id) {
      toast.info(
        "You are not logged in user. Please login to add video to watch later"
      );
      return;
    }
    await handleApiMutation(add, { videoId }, 201);
  };

  return (
    <DropdownMenuItem
      disabled={isLoading}
      className="cursor-pointer mb-2 bg-gray-200 dark:bg-gray-700 w-full hover:bg-gray-300 dark:hover:bg-gray-600"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleAddToWatchLater();
      }}
    >
      {isLoading ? (
        <span>Adding...</span>
      ) : (
        <>
          {" "}
          <Clock className="mr-2 h-4 w-4" />
          Watch later
        </>
      )}
    </DropdownMenuItem>
  );
};

export default WatchLaterAction;
