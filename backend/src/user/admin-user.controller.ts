import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  Body,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { QueryUserDto } from "./dto/query-user.dto";
import { UpdateUserStatusDto } from "./dto/update-user-status.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Types } from "mongoose";

@Controller("admin/users")
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: Types.ObjectId) {
    return this.userService.findById(id);
  }

  @Get("slug/:slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.userService.findBySlug(slug);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: Types.ObjectId,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.update(id, dto);
  }

  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: Types.ObjectId,
    @Body() dto: UpdateUserStatusDto
  ) {
    return this.userService.updateStatus(id, dto.status);
  }

  @Delete(":id")
  async softDelete(@Param("id") id: Types.ObjectId) {
    return this.userService.softDelete(id);
  }

  @Delete(":id/permanent")
  async hardDelete(@Param("id") id: Types.ObjectId) {
    return this.userService.hardDelete(id);
  }
}
