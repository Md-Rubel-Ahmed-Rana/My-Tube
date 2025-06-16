import { IEditVideo } from "@/types/video.type";
import apiSlice from "../api";

const videoApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    uploadVideo: build.mutation({
      query: (data: FormData) => ({
        url: "video/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
    incrementVideoViews: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `video/${id}/views`,
        method: "PATCH",
      }),
      invalidatesTags: ["video"],
    }),
    updateVideo: build.mutation({
      query: ({
        id,
        updatedData,
      }: {
        id: string;
        updatedData: IEditVideo;
      }) => ({
        url: `video/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["video"],
    }),
    getVideosByOwner: build.query({
      query: () => ({
        url: "video/owner",
      }),
      providesTags: ["video"],
    }),
    getVideos: build.query({
      query: () => ({
        url: "video",
      }),
      providesTags: ["video"],
    }),
    getSingleVideo: build.query({
      query: ({ id }: { id: string }) => ({
        url: `video/${id}`,
      }),
      providesTags: ["video"],
    }),
  }),
});

export const {
  useUploadVideoMutation,
  useGetVideosByOwnerQuery,
  useGetVideosQuery,
  useGetSingleVideoQuery,
  useIncrementVideoViewsMutation,
  useUpdateVideoMutation,
} = videoApi;
