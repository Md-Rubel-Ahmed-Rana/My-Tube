import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: { expiresIn: "1d" },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService],
})
export class AuthModule {}
