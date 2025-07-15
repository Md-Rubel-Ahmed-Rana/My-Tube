import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = process.env.NEXT_PUBLIC_BASE_API as string;

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApi,
    credentials: "include",
  }),
  tagTypes: [
    "user",
    "video",
    "like",
    "comment",
    "playlist",
    "channel",
    "admin",
    "watch-later",
    "categories",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
