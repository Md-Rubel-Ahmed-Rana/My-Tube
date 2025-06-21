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
    getSinglePlaylistVideos: builder.query<
      IApiResponse<IPlaylist | null>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/playlist/${id}`,
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
      query: ({ id, name }: { id: string; name: string }) => ({
        url: `/playlist/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["playlist"],
    }),
    removeVideoFromPlaylist: builder.mutation({
      query: ({ id, videoId }: { id: string; videoId: string }) => ({
        url: `/playlist/${id}/remove-video`,
        method: "PATCH",
        body: { videoId },
      }),
      invalidatesTags: ["playlist"],
    }),
    deletePlaylist: builder.mutation({
      query: ({ id }: { id: string }) => ({
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
  useGetSinglePlaylistVideosQuery,
  useRemoveVideoFromPlaylistMutation,
} = playlistApi;
