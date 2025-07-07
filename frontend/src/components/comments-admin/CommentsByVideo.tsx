import { useGetAllCommentsByVideoQuery } from "@/features/comment";
import { IComment } from "@/types/comment.type";
import { useRouter } from "next/router";
import React from "react";
import CommentsTable from "./CommentsTable";
import VideosList from "./VideosList";

const CommentsByVideo = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const title = query?.title as string;
  const { data, isLoading, isFetching } = useGetAllCommentsByVideoQuery({ id });
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
          <VideosList />
          <CommentsTable
            comments={comments}
            isLoading={isLoading || isFetching}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <VideosList />
          <p className="text-gray-800 dark:text-gray-200">
            You did not select any video please select first
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsByVideo;
