import { IComment } from "@/types/comment.type";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import moment from "moment";

type Props = {
  comment: IComment;
};

const CommentCard = ({ comment }: Props) => {
  const { text, user, createdAt } = comment;

  return (
    <Card className="w-full  border-b-0 border-r-0 border-l-0 border-t-gray-200 dark:border-t-gray-700 rounded-none p-2 shadow-gray-100 dark:shadow-gray-800  bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border">
            <AvatarImage src={user?.photo || ""} />
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
              {user.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium">{user.name}</p>
            <span className="text-sm text-muted-foreground">
              {moment(createdAt).fromNow()}
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>

      <CardContent className="pt-0 -mt-3">
        <p className="text-sm leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
