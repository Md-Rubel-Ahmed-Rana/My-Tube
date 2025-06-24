import { IEditVideo, IVideo } from "@/types/video.type";
import apiSlice from "../api";
import { IApiResponse } from "@/types/common";

const videoApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    uploadVideo: build.mutation({
      query: (data: FormData) => ({
        url: "video/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["video", "playlist"],
    }),
    incrementVideoViews: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `video/${id}/views`,
        method: "PATCH",
      }),
      invalidatesTags: ["video", "playlist"],
    }),
    deleteVideo: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["video", "playlist"],
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
    getVideosByOwner: build.query<IApiResponse<IVideo[] | []>, void>({
      query: () => ({
        url: "video/owner",
      }),
      providesTags: ["video"],
    }),
    getVideos: build.query<
      IApiResponse<IVideo[] | []>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 100 }) => ({
        url: `video?page=${page}&limit=${limit}`,
      }),
      providesTags: ["video"],
    }),
    getSingleVideo: build.query<IApiResponse<IVideo>, { id: string }>({
      query: ({ id }) => ({
        url: `video/${id}`,
      }),
      providesTags: ["video"],
    }),
    getSingleVideoBySlug: build.query<IApiResponse<IVideo>, { slug: string }>({
      query: ({ slug }) => ({
        url: `video/slug${slug}`,
      }),
      providesTags: ["video"],
    }),
    getRelatedVideos: build.query<
      IApiResponse<IVideo[] | []>,
      { currentVideoId: string }
    >({
      query: ({ currentVideoId }) => ({
        url: `video/${currentVideoId}/related-videos`,
      }),
      providesTags: ["video"],
    }),
    getChannelVideos: build.query<
      IApiResponse<IVideo[] | []>,
      { channelId: string }
    >({
      query: ({ channelId }) => ({
        url: `video/channel/${channelId}`,
      }),
      providesTags: ["video"],
    }),
    searchVideos: build.query<
      IApiResponse<IVideo[] | []>,
      { searchText: string }
    >({
      query: ({ searchText }) => ({
        url: `elastic-search?q=${searchText}`,
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
    dislikeAVideo: build.mutation({
      query: ({ id }: { id: string }) => ({
        method: "PATCH",
        url: `video/${id}/dislike`,
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
  useDislikeAVideoMutation,
} = videoApi;
