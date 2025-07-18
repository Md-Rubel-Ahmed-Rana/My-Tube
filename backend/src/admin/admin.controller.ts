import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";
import { Response } from "express";
import { cookieOptions } from "src/utils/cookieOptions";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  @Get("auth")
  @UseGuards(AuthGuard)
  auth(@Req() req: { user: { id: string } }) {
    return this.adminService.findOne(req.user.id);
  }

  @Post("login")
  async login(
    @Body() credentials: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.adminService.login(credentials);
    res.cookie("my_tube_access_token", token, cookieOptions);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admin logged in successfully!",
      data: null,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Patch(":id/password")
  @UseGuards(AuthGuard)
  updatePassword(
    @Param("id") id: string,
    @Body() updateAdminDto: UpdatePasswordDto,
    @Res({ passthrough: true }) res: Response
  ) {
    res.clearCookie("my_tube_access_token", cookieOptions);
    return this.adminService.updatePassword(id, updateAdminDto);
  }

  @Patch(":id/photo")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("photo"))
  updateProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: string
  ) {
    return this.adminService.updateProfilePhoto(id, file);
  }
}
