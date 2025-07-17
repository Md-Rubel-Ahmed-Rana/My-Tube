import { IApiResponse } from "@/types/common";
import apiSlice from "../api";
import { IPlaylist, PlaylistStatus } from "@/types/playlist.type";

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
      IApiResponse<IPlaylist>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/playlist/${id}`,
        method: "GET",
      }),
      providesTags: ["playlist"],
    }),
    getPlaylistVideosBySlug: builder.query<
      IApiResponse<IPlaylist>,
      { slug: string }
    >({
      query: ({ slug }) => ({
        url: `/playlist/slug/${slug}`,
      }),
      providesTags: ["playlist"],
    }),
    getUserPublicPlaylists: builder.query<
      IApiResponse<IPlaylist[]>,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/playlist/public/${userId}`,
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
    updatePlaylistStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: PlaylistStatus }) => ({
        url: `/playlist/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["playlist"],
    }),
    reorderPlaylistVideos: builder.mutation({
      query: ({ id, videoIds }: { id: string; videoIds: string[] }) => ({
        url: `/playlist/${id}/reorder`,
        method: "PATCH",
        body: { videoIds },
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
    addVideoToPlaylist: builder.mutation({
      query: ({
        playlistId,
        videoId,
      }: {
        playlistId: string;
        videoId: string;
      }) => ({
        url: `/playlist/${playlistId}/add-video`,
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

    // admin APIs
    getPlaylistsByAdmin: builder.query({
      query: () => ({
        url: `/admin/playlists`,
      }),
      providesTags: ["playlist"],
    }),
    getPlaylistDetailsAdmin: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/admin/playlists/${id}`,
      }),
      providesTags: ["playlist"],
    }),
    updatePlaylistStatusByAdmin: builder.mutation({
      query: ({ id, status }: { id: string; status: PlaylistStatus }) => ({
        url: `/admin/playlists/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["playlist"],
    }),
    deletePlaylistPermanently: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/admin/playlists/${id}`,
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
  useAddVideoToPlaylistMutation,
  useGetPlaylistVideosBySlugQuery,
  useReorderPlaylistVideosMutation,
  useGetPlaylistsByAdminQuery,
  useGetPlaylistDetailsAdminQuery,
  useUpdatePlaylistStatusByAdminMutation,
  useDeletePlaylistPermanentlyMutation,
  useGetUserPublicPlaylistsQuery,
  useUpdatePlaylistStatusMutation,
} = playlistApi;
