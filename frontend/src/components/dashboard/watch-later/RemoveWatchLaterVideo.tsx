import { useRemoveVideoFromWatchLaterMutation } from "@/features/watch-later";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  id: string;
};

const RemoveWatchLaterVideo = ({ id }: Props) => {
  const [remove, { isLoading }] = useRemoveVideoFromWatchLaterMutation();

  const handleDelete = async () => {
    await handleApiMutation(remove, { videoId: id }, 200);
  };
  return (
    <Button
      disabled={isLoading}
      variant="destructive"
      size="xs"
      onClick={handleDelete}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default RemoveWatchLaterVideo;
