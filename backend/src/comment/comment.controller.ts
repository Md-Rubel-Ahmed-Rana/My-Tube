import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Req() req: { user: { id: string } },
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentService.create({
      ...createCommentDto,
      video: new Types.ObjectId(createCommentDto.video),
      user: new Types.ObjectId(req.user.id),
    });
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

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body("text") text: string) {
    return this.commentService.update(new Types.ObjectId(id), text);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentService.remove(new Types.ObjectId(id));
  }
}
