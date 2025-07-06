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
    updateCoverImage: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        method: "PATCH",
        url: `user/${id}/cover-image`,
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
    getUserActivities: builder.query({
      query: () => ({
        url: `user-activity`,
      }),
      providesTags: ["user"],
    }),
    getUserWatchHistory: builder.query({
      query: () => ({
        url: `user-activity/watch-history`,
      }),
      providesTags: ["user"],
    }),
    // Admin endpoints
    getUserStats: builder.query({
      query: () => ({
        url: `/admin/users/stats`,
      }),
      providesTags: ["user"],
    }),
    getAllUserByAdmin: builder.query({
      query: ({
        searchQuery,
        status,
      }: {
        searchQuery?: string;
        status?: string;
      }) => {
        let url = "/admin/users";
        const params = new URLSearchParams();

        if (searchQuery && searchQuery.trim() !== "") {
          params.append("searchQuery", searchQuery);
        }

        if (status && status.trim() !== "") {
          params.append("status", status);
        }

        if ([...params].length > 0) {
          url += `?${params.toString()}`;
        }

        return { url };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateUserNameMutation,
  useUpdateProfileImageMutation,
  useGetUserByIdQuery,
  useGetUserBySlugQuery,
  useUpdateCoverImageMutation,
  useGetUserActivitiesQuery,
  useGetUserWatchHistoryQuery,
  useGetUserStatsQuery,
  useGetAllUserByAdminQuery,
} = userApi;
