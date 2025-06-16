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
    getVideosByOwner: build.query({
      query: () => ({
        url: "video/owner",
      }),
      providesTags: ["video"],
    }),
  }),
});

export const { useUploadVideoMutation, useGetVideosByOwnerQuery } = videoApi;
