import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserActivityEvents } from "src/constants/events";
import { UpdateWatchHistory } from "src/user-activity/dto/update-watch-history.activity";
import { UserActivityService } from "src/user-activity/user-activity.service";

@Injectable()
export class UserActivityEventService {
  private readonly logger = new Logger(UserActivityEventService.name);

  constructor(private readonly userActivityService: UserActivityService) {}

  @OnEvent(UserActivityEvents.CREATED)
  async initiateUserActivity(userId: string) {
    await this.userActivityService.initiateUserActivity({ user: userId });
    this.logger.log(`🟢 Initialized activity tracking for user: ${userId}`);
  }

  @OnEvent(UserActivityEvents.WATCH_HISTORY)
  async performWatchHistory(payload: {
    userId: string;
    video: UpdateWatchHistory;
  }) {
    await this.userActivityService.performWatchHistory(
      payload.userId,
      payload.video
    );
    this.logger.log(
      `📺 Watch history updated | User: ${payload.userId}, Video ID: ${payload.video.videoId}, Duration: ${payload.video.duration}, Watched At: ${new Date()}`
    );
  }

  @OnEvent(UserActivityEvents.LIKE_COMMENT_SUBSCRIBE)
  async performMultiFields({
    userId,
    type,
    action,
  }: {
    userId: string;
    type: "like" | "comment" | "subscribed";
    action: "increase" | "decrease";
  }) {
    await this.userActivityService.performMultiFields(userId, type, action);
    this.logger.log(
      `📌 User activity changed | User: ${userId}, Type: ${type}, Action: ${action}`
    );
  }
}
