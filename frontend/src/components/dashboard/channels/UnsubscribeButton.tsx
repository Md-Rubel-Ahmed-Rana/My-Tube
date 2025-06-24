import { Button } from "@/components/ui/button";
import { useUnsubscribeChannelMutation } from "@/features/channel";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { Loader2, XCircle } from "lucide-react";

interface Props {
  channelId: string;
}

export const UnsubscribeButton = ({ channelId }: Props) => {
  const [unsubscribe, { isLoading }] = useUnsubscribeChannelMutation();

  const handleUnsubscribe = async (e: React.MouseEvent) => {
    e.preventDefault();
    await handleApiMutation(unsubscribe, { channelId }, 200, {
      error: "Failed to unsubscribe. Please try again later.",
      success: "Unsubscribed successfully.",
    });
  };

  return (
    <Button
      onClick={handleUnsubscribe}
      size="sm"
      disabled={isLoading}
      className="ml-auto mt-2 bg-gray-400 dark:bg-gray-700"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <XCircle className="w-4 h-4 mr-1" />
          Unsubscribe
        </>
      )}
    </Button>
  );
};
