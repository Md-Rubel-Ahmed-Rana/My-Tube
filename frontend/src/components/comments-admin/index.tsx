import { useGetAllCommentsByAdminQuery } from "@/features/comment";
import { CommentStatus, IComment } from "@/types/comment.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Trash2, ShieldCheck, Ban } from "lucide-react";

const truncateText = (text: string = "", maxLength = 30) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

const CommentsByAdmin = () => {
  const { data, isLoading } = useGetAllCommentsByAdminQuery({});
  const comments = (data?.data || []) as IComment[];

  const handleEdit = (comment: IComment) => {
    console.log("Edit", comment.id);
  };

  const handleDelete = (comment: IComment) => {
    console.log("Delete", comment.id);
  };

  const toggleStatus = (comment: IComment) => {
    console.log("Toggle status", comment.id);
  };

  return (
    <Card className="p-2 lg:p-4 bg-gray-100 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Manage Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comment</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Video</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                        <TooltipContent>{comment?.video?.title}</TooltipContent>
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
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(comment)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(comment)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => toggleStatus(comment)}
                        title="Toggle Status"
                      >
                        {comment?.status === CommentStatus.ACTIVE ? (
                          <Ban className="w-4 h-4 text-red-500" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-green-600" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentsByAdmin;
