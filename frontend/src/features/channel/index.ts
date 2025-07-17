import apiSlice from "../api";

export const channelApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    isSubscribedChannel: build.query({
      query: ({ channelId }: { channelId: string }) => ({
        url: `/channels/is-subscribed/${channelId}`,
      }),
      providesTags: ["channel", "video", "user"],
    }),
    myChannels: build.query({
      query: () => ({
        url: `/channels/me`,
      }),
      providesTags: ["channel", "video", "user"],
    }),
    getTopChannels: build.query({
      query: () => ({
        url: `/channels/top`,
      }),
      providesTags: ["channel", "video", "user"],
    }),
    subscribeChannel: build.mutation({
      query: ({ channelId }: { channelId: string }) => ({
        url: `/channels/subscribe`,
        method: "PATCH",
        body: { channel: channelId },
      }),
      invalidatesTags: ["channel", "video", "user"],
    }),
    unsubscribeChannel: build.mutation({
      query: ({ channelId }: { channelId: string }) => ({
        url: `/channels/unsubscribe`,
        method: "PATCH",
        body: { channel: channelId },
      }),
      invalidatesTags: ["channel", "video", "user"],
    }),
    // admin endpoints
    getChannelsStats: build.query({
      query: () => ({
        url: `/admin/channels/stats`,
      }),
      providesTags: ["channel", "video", "user"],
    }),
  }),
});

export const {
  useIsSubscribedChannelQuery,
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
  useMyChannelsQuery,
  useGetTopChannelsQuery,
  useGetChannelsStatsQuery,
} = channelApi;
