import { ILogin } from "@/types/auth.type";
import apiSlice from "../api";
import { ICreateAdmin } from "@/types/admin.type";

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
    createAdmin: builder.mutation({
      query: (data: ICreateAdmin) => ({
        method: "POST",
        url: "/admin",
        body: data,
      }),
      invalidatesTags: ["user", "admin"],
    }),
    getLoggedInAdmin: builder.query({
      query: () => ({
        method: "GET",
        url: "/admin/auth",
      }),
      providesTags: ["admin"],
    }),
    getAllAdmins: builder.query({
      query: () => ({
        method: "GET",
        url: "/admin",
      }),
      providesTags: ["admin"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetLoggedInAdminQuery,
  useGetAllAdminsQuery,
  useCreateAdminMutation,
} = adminApi;
