import { IApiResponse } from "@/types/common";
import apiSlice from "../api";
import { IUser } from "@/types/user.type";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserName: builder.mutation({
      query: ({ id, name }: { id: string; name: string }) => ({
        method: "PATCH",
        url: `user/${id}`,
        body: { name },
      }),
      invalidatesTags: ["user"],
    }),
    updateProfileImage: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        method: "PATCH",
        url: `user/${id}/photo`,
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    getUserById: builder.query<IApiResponse<IUser>, { id: string }>({
      query: ({ id }) => ({
        url: `user/${id}`,
      }),
      providesTags: ["user"],
    }),
    getUserBySlug: builder.query<IApiResponse<IUser>, { slug: string }>({
      query: ({ slug }) => ({
        url: `user/slug/${slug}`,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateUserNameMutation,
  useUpdateProfileImageMutation,
  useGetUserByIdQuery,
  useGetUserBySlugQuery,
} = userApi;
