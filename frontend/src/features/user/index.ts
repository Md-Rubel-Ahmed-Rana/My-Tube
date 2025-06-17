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
  }),
});

export const { useUpdateUserNameMutation } = userApi;
