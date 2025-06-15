import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Types } from "mongoose";

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
}
