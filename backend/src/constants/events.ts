import { UpdateWatchHistory } from "src/user-activity/dto/update-watch-history.activity";

export const UserActivityEvents = {
  CREATED: "user-activity.created",
  WATCH_HISTORY: "user-activity-watch-history",
  LIKE_COMMENT_SUBSCRIBE: "user-activity-like-comment-subscribe",
} as const;

export type UserActivityEventMap = {
  [UserActivityEvents.CREATED]: string;
  [UserActivityEvents.WATCH_HISTORY]: {
    userId: string;
    video: UpdateWatchHistory;
  };
  [UserActivityEvents.LIKE_COMMENT_SUBSCRIBE]: {
    userId: string;
    type: "like" | "comment" | "subscribed";
    action: "increase" | "decrease";
  };
};
