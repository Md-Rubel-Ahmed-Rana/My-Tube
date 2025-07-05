import apiSlice from "../api";

const watchLaterApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserWatchLater: build.query({
      query: () => ({
        url: "watch-later",
      }),
      providesTags: ["watch-later"],
    }),
  }),
});

export const { useGetUserWatchLaterQuery } = watchLaterApi;
