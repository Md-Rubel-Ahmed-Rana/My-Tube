import { ILogin, IRegister } from "@/types/auth.type";
import apiSlice, { baseApi } from "../api";
import { signIn } from "next-auth/react";
import axios from "axios";

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
  await axios.post(`${baseApi}/auth/google/login`, user, {
    withCredentials: true,
  });
};

export const initializeGoogleOneTap = () => {
  window.google.accounts.id.initialize({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    callback: async (response) => {
      signIn("googleonetap", {
        credential: response.credential,
        redirect: false,
      });
      const res = await fetch("/api/auth/one-tap-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const user = await res.json();
      await userLogin({
        name: user?.name,
        email: user?.email,
        photo: user?.picture,
      });
    },
    auto_select: true,
    cancel_on_tap_outside: false,
  });
  window.google.accounts.id.prompt();
};
