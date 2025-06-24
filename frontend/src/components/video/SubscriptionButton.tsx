import { Button } from "@/components/ui/button";
import {
  useIsSubscribedChannelQuery,
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
} from "@/features/channel";
import { Loader2, CheckCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleApiMutation } from "@/utils/handleApiMutation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props = {
  channelId: string;
};

const SubscriptionButton = ({ channelId }: Props) => {
  const { data, isLoading } = useIsSubscribedChannelQuery({ channelId });
  const isSubscribed = data?.data?.channels?.includes(channelId) ?? false;

  const [subscribe, { isLoading: isSubscribing }] =
    useSubscribeChannelMutation();
  const [unsubscribe, { isLoading: isUnsubscribing }] =
    useUnsubscribeChannelMutation();

  const isMutating = isSubscribing || isUnsubscribing;

  const handleSubscribeActions = async () => {
    if (isMutating) return;

    if (isSubscribed) {
      await handleApiMutation(unsubscribe, { channelId }, 200, {
        error: "Failed to unsubscribe. Please try again later.",
        success: "Unsubscribed successfully.",
      });
    } else {
      await handleApiMutation(subscribe, { channelId }, 200, {
        error: "Failed to subscribe. Please try again later.",
        success: "Subscribed successfully.",
      });
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={handleSubscribeActions}
          disabled={isLoading || isMutating}
          variant={isSubscribed ? "outline" : "default"}
          size="sm"
          className={cn(
            "rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-200",
            isSubscribed
              ? "border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"
              : "bg-primary text-white hover:bg-primary/90"
          )}
        >
          {isLoading || isMutating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>
                {isSubscribed ? "Unsubscribing..." : "Subscribing..."}
              </span>
            </>
          ) : isSubscribed ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Subscribed</span>
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              <span>Subscribe</span>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isSubscribed
          ? "Unsubscribe from this channel"
          : "Subscribe to this channel"}
      </TooltipContent>
    </Tooltip>
  );
};

export default SubscriptionButton;
