import { ILogin, IRegister } from "@/types/auth.type";
import apiSlice from "../api";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: () => ({
        method: "GET",
        url: "/auth",
      }),
      providesTags: ["user"],
    }),
    userLogin: builder.mutation({
      query: (data: ILogin) => ({
        method: "POST",
        url: "/auth/login",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    userRegister: builder.mutation({
      query: (data: IRegister) => ({
        method: "POST",
        url: "/auth/register",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation({
      query: () => ({
        method: "DELETE",
        url: "/auth/logout",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useUserLoginMutation,
  useLogoutMutation,
  useUserRegisterMutation,
} = authApi;
