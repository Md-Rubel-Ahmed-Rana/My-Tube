import { MessageSquareOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AddCommentButton from "./AddCommentButton";

type Props = {
  videoId: string;
};

const NoCommentFound = ({ videoId }: Props) => {
  return (
    <Card className="w-full text-center py-8 bg-gray-300 dark:bg-gray-700 mb-20">
      <CardContent className="flex flex-col items-center gap-4">
        <MessageSquareOff className="w-10 h-10 text-muted-foreground" />
        <h2 className="text-lg font-semibold">No comments yet</h2>
        <p className="text-sm text-muted-foreground">
          Be the first one to share your thoughts!
        </p>
        <AddCommentButton videoId={videoId} />
      </CardContent>
    </Card>
  );
};

export default NoCommentFound;
