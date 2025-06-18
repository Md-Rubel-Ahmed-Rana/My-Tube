import apiSlice from "../api";

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
    getUserById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `user/${id}`,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateUserNameMutation,
  useUpdateProfileImageMutation,
  useGetUserByIdQuery,
} = userApi;
