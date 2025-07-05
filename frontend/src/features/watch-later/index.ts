import apiSlice from "../api";

const watchLaterApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const { useGetUserWatchLaterQuery, useAddToWatchLaterMutation } =
  watchLaterApi;
