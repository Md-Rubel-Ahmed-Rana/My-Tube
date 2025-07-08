import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFile,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdatePasswordDto } from "src/admin/dto/update-password.dto";
import { Response } from "express";
import { cookieOptions } from "src/utils/cookieOptions";
import { ValidateObjectIdPipe } from "src/validations/validate-object-id.pipe";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(":id")
  findOne(@Param("id", ValidateObjectIdPipe) id: Types.ObjectId) {
    return this.userService.findById(id);
  }

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.userService.findBySlug(slug);
  }

  @Patch(":id")
  update(
    @Param("id", ValidateObjectIdPipe) id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(":id/photo")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("photo"))
  updateProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ValidateObjectIdPipe) id: Types.ObjectId
  ) {
    return this.userService.updateProfilePhoto(id, file);
  }

  @Patch(":id/password")
  @UseGuards(AuthGuard)
  updatePassword(
    @Param("id", ValidateObjectIdPipe) id: string,
    @Body() updateAdminDto: UpdatePasswordDto,
    @Res({ passthrough: true }) res: Response
  ) {
    res.clearCookie("my_tube_access_token", cookieOptions);
    return this.userService.updatePassword(id, updateAdminDto);
  }

  @Patch(":id/cover-image")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("coverImage"))
  updateCoverImage(
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ValidateObjectIdPipe) id: Types.ObjectId
  ) {
    return this.userService.updateCoverImage(id, file);
  }
}
