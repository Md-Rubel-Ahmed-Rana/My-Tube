import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Types } from "mongoose";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get("video/:id")
  findAllByVideo(@Param("id") id: string) {
    return this.commentService.findAllByVideo(new Types.ObjectId(id));
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(new Types.ObjectId(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body("text") text: string) {
    return this.commentService.update(new Types.ObjectId(id), text);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentService.remove(new Types.ObjectId(id));
  }
}
