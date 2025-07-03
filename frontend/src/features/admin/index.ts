import { ILogin } from "@/types/auth.type";
import apiSlice from "../api";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data: ILogin) => ({
        method: "POST",
        url: "/admin/login",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getLoggedInAdmin: builder.query({
      query: () => ({
        method: "GET",
        url: "/admin/auth",
      }),
      providesTags: ["admin"],
    }),
  }),
});

export const { useAdminLoginMutation, useGetLoggedInAdminQuery } = adminApi;
