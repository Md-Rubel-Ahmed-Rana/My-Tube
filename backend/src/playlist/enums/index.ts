export enum PlaylistStatus {
  PUBLIC = "public", // Visible to everyone
  PRIVATE = "private", // Only visible to the owner
  UNLISTED = "unlisted", // Hidden from search but accessible via link
  BLOCKED = "blocked", // Blocked by admin (e.g., copyright, spam)
  DELETED = "deleted", // Soft-deleted (still in DB but hidden)
}
