export const adminBreadcrumbMap: Record<string, string[]> = {
  "/admin/dashboard": ["Dashboard"],

  "/admin/dashboard/admins": ["Manage Admins", "All Admins"],
  "/admin/dashboard/admins/create": ["Manage Admins", "Create Admin"],

  "/admin/dashboard/users": ["Manage Users", "All Users"],
  "/admin/dashboard/users/stats": ["Manage Users", "User Stats"],
  "/admin/dashboard/users/status": ["Manage Users", "Users by Status"],
  "/admin/dashboard/users/deleted": ["Manage Users", "Deleted Users"],

  "/admin/dashboard/videos": ["Manage Videos", "All Videos"],
  "/admin/dashboard/videos/stats": ["Manage Videos", "Video Stats"],
  "/admin/dashboard/videos/details": ["Manage Videos", "Video Details"],
  "/admin/dashboard/videos/details/:slug": ["Manage Videos", "Video Details"],
  "/admin/dashboard/videos/status": ["Manage Videos", "Videos by Status"],
  "/admin/dashboard/videos/channel": ["Manage Videos", "Videos by Channel"],
  "/admin/dashboard/videos/blocked": ["Manage Videos", "Blocked Videos"],
  "/admin/dashboard/videos/pending": ["Manage Videos", "Pending Videos"],
  "/admin/dashboard/videos/deleted": ["Manage Videos", "Deleted Videos"],

  "/admin/dashboard/playlists": ["Manage Playlists", "All Playlists"],
  "/admin/dashboard/playlists/stats": ["Manage Playlists", "Playlist Stats"],
  "/admin/dashboard/playlists/details": [
    "Manage Playlists",
    "Playlist Details",
  ],
  "/admin/dashboard/playlists/blocked": [
    "Manage Playlists",
    "Blocked Playlists",
  ],

  "/admin/dashboard/channels": ["Manage Channels", "All Channels"],
  "/admin/dashboard/channels/stats": ["Manage Channels", "Channel Stats"],
  "/admin/dashboard/channels/details": ["Manage Channels", "Channel Details"],

  "/admin/dashboard/comments": ["Manage Comments", "All Comments"],
  "/admin/dashboard/comments/stats": ["Manage Comments", "Comment Stats"],
  "/admin/dashboard/comments/video": ["Manage Comments", "Comments by Video"],
  "/admin/dashboard/comments/user": ["Manage Comments", "Comments by User"],
  "/admin/dashboard/comments/status": ["Manage Comments", "Comments by Status"],
  "/admin/dashboard/comments/blocked": ["Manage Comments", "Blocked Comments"],
};
