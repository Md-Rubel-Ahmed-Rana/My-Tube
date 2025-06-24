import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { OAuth2Strategy } from "./oauth2.strategy";
import { ChannelService } from "src/channel/channel.service";
import { ChannelModule } from "src/channel/channel.module";

const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: { expiresIn: "1d" },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ChannelModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ConfigService,
    OAuth2Strategy,
    ChannelService,
  ],
})
export class AuthModule {}
