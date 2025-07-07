import { IEditVideo, IVideo, VideoStatus } from "@/types/video.type";
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
    getSingleVideo: build.query<IApiResponse<IVideo>, { id: string }>({
      query: ({ id }) => ({
        url: `video/${id}`,
      }),
      providesTags: ["video"],
    }),
    getSingleVideoBySlug: build.query<IApiResponse<IVideo>, { slug: string }>({
      query: ({ slug }) => ({
        url: `video/slug/${slug}`,
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
    getHomeFeedVideos: build.query<IApiResponse<IVideo[] | []>, void>({
      query: () => ({
        url: `video/feed`,
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
    // admin endpoints
    getVideosStats: build.query({
      query: () => ({
        url: `admin/videos/stats`,
      }),
      providesTags: ["video"],
    }),
    getAllVideosByAdmin: build.query({
      query: ({
        page = 1,
        limit = 10,
        searchText = "",
      }: {
        page: number;
        limit: number;
        searchText?: string;
      }) => ({
        url: `admin/videos?page=${page}&limit=${limit}&searchText=${searchText}`,
      }),
      providesTags: ["video"],
    }),
    getVideosByStatus: build.query({
      query: ({ status = VideoStatus.PUBLISHED }: { status: VideoStatus }) => ({
        url: `/admin/videos/by-status?status=${status}`,
      }),
      providesTags: ["video"],
    }),
    getVideosByChannel: build.query({
      query: ({ channelId }: { channelId: string }) => ({
        url: `/admin/videos/channel/${channelId}`,
      }),
      providesTags: ["video"],
    }),
    updateVideoStatusByAdmin: build.mutation({
      query: ({ id, status }: { id: string; status: VideoStatus }) => ({
        url: `/admin/videos/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["video"],
    }),
    deleteVideoPermanently: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/admin/videos/${id}`,
        method: "DELETE",
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
  useGetSingleVideoBySlugQuery,
  useIncrementVideoViewsMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useUpdateThumbnailMutation,
  useSearchVideosQuery,
  useGetRelatedVideosQuery,
  useGetChannelVideosQuery,
  useLikeToAVideoMutation,
  useDislikeAVideoMutation,
  useGetHomeFeedVideosQuery,
  useGetVideosStatsQuery,
  useGetAllVideosByAdminQuery,
  useGetVideosByStatusQuery,
  useGetVideosByChannelQuery,
  useUpdateVideoStatusByAdminMutation,
  useDeleteVideoPermanentlyMutation,
} = videoApi;
