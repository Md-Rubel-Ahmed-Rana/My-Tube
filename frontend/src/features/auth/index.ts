/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILogin, IRegister } from "@/types/auth.type";
import apiSlice, { baseApi } from "../api";
import axios from "axios";
import { toast } from "sonner";

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

export const userLogin = async (user: {
  name: string;
  email: string;
  photo: string;
}) => {
  const result: any = await axios.post(`${baseApi}/auth/google/login`, user, {
    withCredentials: true,
  });
  if (result?.data?.statusCode === 200) {
    toast.success(result?.data?.message || "User logged in successfully");
    window.location.reload();
  } else {
    toast.error(
      result?.data.error?.message ||
        result?.error?.data?.message ||
        "Failed to login"
    );
  }
};

export const initializeGoogleOneTap = async () => {
  window.google.accounts.id.initialize({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    callback: async (response: any) => {
      const idToken = response.credential;
      await axios.post(
        `${baseApi}/auth/google/onetap`,
        { idToken },
        {
          withCredentials: true,
        }
      );
    },
    auto_select: true,
    cancel_on_tap_outside: false,
  });

  window.google.accounts.id.prompt();
};
