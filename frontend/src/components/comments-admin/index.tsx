import { useGetAllCommentsByAdminQuery } from "@/features/comment";
import { IComment } from "@/types/comment.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommentsTable from "./CommentsTable";

const CommentsByAdmin = () => {
  const { data, isLoading } = useGetAllCommentsByAdminQuery({});
  const comments = (data?.data || []) as IComment[];

  return (
    <Card className="p-2 lg:p-4 bg-gray-100 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Manage Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <CommentsTable comments={comments} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default CommentsByAdmin;
