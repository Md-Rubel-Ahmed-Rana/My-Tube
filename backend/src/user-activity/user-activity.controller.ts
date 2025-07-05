import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { UserActivityService } from "./user-activity.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("user-activity")
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @UseGuards(AuthGuard)
  @Get()
  findActivityForAUser(@Req() req: { user: { id: string } }) {
    return this.userActivityService.findActivityForAUser(req?.user?.id);
  }

  @UseGuards(AuthGuard)
  @Get("watch-history")
  getUserWatchHistory(@Req() req: { user: { id: string } }) {
    return this.userActivityService.getUserWatchHistory(req?.user?.id);
  }
}
