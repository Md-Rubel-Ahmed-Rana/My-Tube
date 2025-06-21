import { IApiResponse } from "@/types/common";
import apiSlice from "../api";
import { IPlaylist } from "@/types/playlist.type";

export const playlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylistsByOwner: builder.query<
      IApiResponse<IPlaylist[] | []>,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/playlist/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["playlist"],
    }),
    createPlaylist: builder.mutation({
      query: ({ playlist }: { playlist: { name: string } }) => ({
        url: "/playlist",
        method: "POST",
        body: playlist,
      }),
      invalidatesTags: ["playlist"],
    }),
    updatePlaylist: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/playlist/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["playlist"],
    }),
    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `/playlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["playlist"],
    }),
  }),
});

export const {
  useGetPlaylistsByOwnerQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;
