import apiSlice from "../api";

const watchLaterApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllWatchLater: build.query({
      query: () => ({
        url: "watch-later",
      }),
      providesTags: ["watch-later"],
    }),
    getUserWatchLater: build.query({
      query: () => ({
        url: "watch-later",
      }),
      providesTags: ["watch-later"],
    }),
    addToWatchLater: build.mutation({
      query: ({ videoId }: { videoId: string }) => ({
        url: "watch-later",
        method: "POST",
        body: { video: videoId },
      }),
      invalidatesTags: ["watch-later"],
    }),
    removeVideoFromWatchLater: build.mutation({
      query: ({ videoId }: { videoId: string }) => ({
        url: `watch-later/${videoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["watch-later"],
    }),
    deleteWatchLater: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `watch-later/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["watch-later"],
    }),
  }),
});

export const {
  useGetUserWatchLaterQuery,
  useAddToWatchLaterMutation,
  useRemoveVideoFromWatchLaterMutation,
  useGetAllWatchLaterQuery,
  useDeleteWatchLaterMutation,
} = watchLaterApi;
