import { IComment } from "@/types/comment.type";
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
  }),
});

export const { useGetCommentsByVideoQuery } = commentApi;
