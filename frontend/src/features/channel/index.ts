import apiSlice from "../api";

export const channelApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    isSubscribedChannel: build.query({
      query: ({ channelId }: { channelId: string }) => ({
        url: `/channels/is-subscribed/${channelId}`,
      }),
      providesTags: ["channel", "video"],
    }),
    myChannels: build.query({
      query: () => ({
        url: `/channels/me`,
      }),
      providesTags: ["channel", "video"],
    }),
    getTopChannels: build.query({
      query: () => ({
        url: `/channels/top`,
      }),
      providesTags: ["channel", "video"],
    }),
    subscribeChannel: build.mutation({
      query: ({ channelId }: { channelId: string }) => ({
        url: `/channels/subscribe`,
        method: "PATCH",
        body: { channel: channelId },
      }),
      invalidatesTags: ["channel", "video"],
    }),
    unsubscribeChannel: build.mutation({
      query: ({ channelId }: { channelId: string }) => ({
        url: `/channels/unsubscribe`,
        method: "PATCH",
        body: { channel: channelId },
      }),
      invalidatesTags: ["channel", "video"],
    }),
  }),
});

export const {
  useIsSubscribedChannelQuery,
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
  useMyChannelsQuery,
  useGetTopChannelsQuery,
} = channelApi;
