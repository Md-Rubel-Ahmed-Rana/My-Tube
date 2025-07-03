import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Types } from "mongoose";

@Controller("admin/comments")
export class AdminCommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.commentService.findAllWithFilters(query);
  }

  @Get("stats")
  async getCommentsStatsAnalytics() {
    return this.commentService.getCommentsStatsAnalytics();
  }

  @Get("video/:id")
  findAllByVideo(@Param("id") id: string) {
    return this.commentService.findAllByVideo(new Types.ObjectId(id));
  }

  @Get("user/:id")
  findAllByUser(@Param("id") id: string) {
    return this.commentService.findAllByUser(new Types.ObjectId(id));
  }

  @Get(":id")
  async findOne(@Param("id") id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException("Invalid ID");
    return this.commentService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException("Invalid ID");
    return this.commentService.remove(id);
  }

  @Patch(":id/block")
  async block(@Param("id") id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException("Invalid ID");
    return this.commentService.blockAComment(id);
  }

  @Patch(":id/unblock")
  async unblock(@Param("id") id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException("Invalid ID");
    return this.commentService.unblockAComment(id);
  }
}
