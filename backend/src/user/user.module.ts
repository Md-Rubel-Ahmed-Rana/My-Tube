import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { ConfigService } from "@nestjs/config";
import { ChannelService } from "src/channel/channel.service";
import { ChannelModule } from "src/channel/channel.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ChannelModule,
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService, ChannelService],
})
export class UserModule {}
