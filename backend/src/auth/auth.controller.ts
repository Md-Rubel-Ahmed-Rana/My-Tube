import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Response } from "express";
import { AuthGuard } from "./auth.guard";
import { Types } from "mongoose";
import { cookieOptions } from "src/utils/cookieOptions";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async auth(@Req() req: { user: { id: Types.ObjectId } }) {
    return await this.authService.auth(req?.user?.id);
  }

  @Post("/register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("/login")
  async login(
    @Body() credentials: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.login(credentials);
    res.cookie("my_tube_access_token", token, cookieOptions);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: null,
    });
  }

  @Get("google")
  @UseGuards(PassportAuthGuard("oauth2"))
  async googleAuth() {}

  @Get("callback/google")
  @UseGuards(PassportAuthGuard("oauth2"))
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ) {
    const { id, name, email, picture } = req.user;

    const token = await this.authService.googleLogin({
      name,
      email,
      photo: picture,
      username: id,
    });

    res.cookie("my_tube_access_token", token, cookieOptions);

    return res.redirect(this.configService.get<string>("GOOGLE_REDIRECT_URL"));
  }

  @Post("/google/login")
  async googleLogin(
    @Body() credentials: GoogleLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.googleLogin(credentials);
    res.cookie("my_tube_access_token", token, cookieOptions);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: null,
    });
  }

  @Delete("/logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("my_tube_access_token", cookieOptions);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      message: "User logged out successfully!",
      data: null,
    });
  }
}
