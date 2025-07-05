import { Module } from "@nestjs/common";
import { UserActivityService } from "./user-activity.service";
import { UserActivityController } from "./user-activity.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserActivity, UserActivitySchema } from "./user-activity.schema";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserActivity.name, schema: UserActivitySchema },
    ]),
  ],
  controllers: [UserActivityController],
  providers: [UserActivityService, ConfigService],
  exports: [UserActivityService],
})
export class UserActivityModule {}
