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

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
