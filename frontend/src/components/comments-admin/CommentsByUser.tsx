import { useGetAllCommentsByUserQuery } from "@/features/comment";
import { IComment } from "@/types/comment.type";
import { useRouter } from "next/router";
import React from "react";
import CommentsTable from "./CommentsTable";
import UsersList from "./UsersList";

const CommentsByUser = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const title = query?.name as string;
  const { data, isLoading, isFetching } = useGetAllCommentsByUserQuery({ id });
  const comments = (data?.data || []) as IComment[];
  return (
    <div className="p-2 lg:p-4">
      {id ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center">
            <p className="text-gray-800 dark:text-gray-200">
              Comments for:{" "}
              <span className="text-muted-foreground">
                {title || "unknown"}
              </span>{" "}
            </p>
          </div>
          <UsersList />
          <CommentsTable
            comments={comments}
            isLoading={isLoading || isFetching}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <UsersList />
          <p className="text-gray-800 dark:text-gray-200">
            You did not select any user. Please select first
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsByUser;
