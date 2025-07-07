import { IAddComment, IComment } from "@/types/comment.type";
import apiSlice from "../api";
import { IApiResponse } from "@/types/common";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCommentsByVideo: build.query<
      IApiResponse<IComment[]>,
      { videoId: string }
    >({
      query: ({ videoId }) => ({
        url: `comment/video/${videoId}`,
      }),
      providesTags: ["comment", "video"],
    }),
    addNewComment: build.mutation<IApiResponse<null>, { comment: IAddComment }>(
      {
        query: ({ comment }) => ({
          url: "comment",
          method: "POST",
          body: comment,
        }),
        invalidatesTags: ["comment"],
      }
    ),
    editComment: build.mutation<
      IApiResponse<null>,
      { comment: { id: string; text: string } }
    >({
      query: ({ comment }) => ({
        url: `comment/${comment?.id}`,
        method: "PATCH",
        body: { text: comment?.text },
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: build.mutation<IApiResponse<null>, { id: string }>({
      query: ({ id }) => ({
        url: `comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comment"],
    }),
    // admin routes
    getCommentsStats: build.query({
      query: () => ({
        url: `/admin/comments/stats`,
      }),
      providesTags: ["comment"],
    }),
    getAllCommentsByAdmin: build.query({
      query: () => ({
        url: `/admin/comments`,
      }),
      providesTags: ["comment"],
    }),
  }),
});

export const {
  useGetCommentsByVideoQuery,
  useAddNewCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsStatsQuery,
  useGetAllCommentsByAdminQuery,
} = commentApi;
