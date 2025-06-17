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
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(":id")
  findOne(@Param("id") id: Types.ObjectId) {
    return this.userService.findById(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }
  @Patch(":id/photo")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("photo"))
  updateProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: { id: Types.ObjectId } }
  ) {
    return this.userService.updateProfilePhoto(req.user?.id, file);
  }
}
