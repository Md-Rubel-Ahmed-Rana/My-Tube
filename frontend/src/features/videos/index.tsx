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
    deleteVideo: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `video/${id}`,
        method: "DELETE",
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
      query: ({
        page = 1,
        limit = 100,
      }: {
        page?: number;
        limit?: number;
      }) => ({
        url: `video?page=${page}&limit=${limit}`,
      }),
      providesTags: ["video"],
    }),
    getSingleVideo: build.query({
      query: ({ id }: { id: string }) => ({
        url: `video/${id}`,
      }),
      providesTags: ["video"],
    }),
    getRelatedVideos: build.query({
      query: ({ currentVideoId }: { currentVideoId: string }) => ({
        url: `video/${currentVideoId}/related-videos`,
      }),
      providesTags: ["video"],
    }),
    getChannelVideos: build.query({
      query: ({ channelId }: { channelId: string }) => ({
        url: `video/channel/${channelId}`,
      }),
      providesTags: ["video"],
    }),
    searchVideos: build.query({
      query: ({ searchText }: { searchText: string }) => ({
        url: `video/search?searchText=${searchText}`,
      }),
      providesTags: ["video"],
    }),
    updateThumbnail: build.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        method: "PATCH",
        url: `video/${id}/thumbnail`,
        body: formData,
      }),
      invalidatesTags: ["video"],
    }),
    likeToAVideo: build.mutation({
      query: ({ id }: { id: string }) => ({
        method: "PATCH",
        url: `video/${id}/like`,
      }),
      invalidatesTags: ["video"],
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
  useDeleteVideoMutation,
  useUpdateThumbnailMutation,
  useSearchVideosQuery,
  useGetRelatedVideosQuery,
  useGetChannelVideosQuery,
  useLikeToAVideoMutation,
} = videoApi;
