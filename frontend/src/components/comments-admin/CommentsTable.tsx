import { CommentStatus, IComment } from "@/types/comment.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { truncateText } from "@/utils/truncateText";
import CommentActions from "./CommentActions";

type Props = {
  comments: IComment[];
  isLoading: boolean;
};

const CommentsTable = ({ comments = [], isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <>
          {comments?.length <= 0 ? (
            <div className="flex justify-center items-center mt-3 text-muted-foreground">
              <p>No comment found!</p>
            </div>
          ) : (
            <TooltipProvider>
              <Table className="dark:text-gray-200 text-gray-800">
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-200 text-gray-800">
                      Comment
                    </TableHead>
                    <TableHead className="dark:text-gray-200 text-gray-800">
                      User
                    </TableHead>
                    <TableHead className="dark:text-gray-200 text-gray-800">
                      Video
                    </TableHead>
                    <TableHead className="dark:text-gray-200 text-gray-800">
                      Status
                    </TableHead>
                    <TableHead className="text-right dark:text-gray-200 text-gray-800">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment?.id}>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="truncate inline-block max-w-[180px]">
                              {truncateText(comment?.text)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{comment?.text}</TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="truncate inline-block max-w-[120px]">
                              {truncateText(comment?.user?.name)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{comment?.user?.name}</TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="truncate inline-block max-w-[140px]">
                              {truncateText(comment?.video?.title)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {comment?.video?.title}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            comment?.status === CommentStatus.ACTIVE
                              ? "default"
                              : "destructive"
                          }
                        >
                          {comment?.status}
                        </Badge>
                      </TableCell>
                      <CommentActions comment={comment} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TooltipProvider>
          )}
        </>
      )}
    </>
  );
};

export default CommentsTable;
