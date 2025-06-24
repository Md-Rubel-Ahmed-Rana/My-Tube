import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import Link from "next/link";

const NoChannelSubscribed = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <Ban className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold">No Subscriptions Yet</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        You haven&apos;t subscribed to any channels yet. Start exploring and
        subscribe to stay updated with your favorite creators.
      </p>
      <Button asChild>
        <Link href="/">Browse Channels</Link>
      </Button>
    </div>
  );
};

export default NoChannelSubscribed;
