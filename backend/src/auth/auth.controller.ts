import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    res.cookie("my_tube_access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: null,
    });
  }
}
