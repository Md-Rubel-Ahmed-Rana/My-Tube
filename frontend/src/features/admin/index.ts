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
      invalidatesTags: ["admin"],
    }),
    createAdmin: builder.mutation({
      query: (data: ICreateAdmin) => ({
        method: "POST",
        url: "/admin",
        body: data,
      }),
      invalidatesTags: ["admin"],
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
    updateAdminProfileImage: builder.mutation({
      query: ({ formData }: { formData: FormData }) => ({
        method: "PATCH",
        url: `admin/photo`,
        body: formData,
      }),
      invalidatesTags: ["admin"],
    }),
    updateAdminName: builder.mutation({
      query: ({ id, name }: { id: string; name: string }) => ({
        method: "PATCH",
        url: `admin/${id}`,
        body: { name },
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetLoggedInAdminQuery,
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminProfileImageMutation,
  useUpdateAdminNameMutation,
} = adminApi;
