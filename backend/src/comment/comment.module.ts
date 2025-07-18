import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "./comment.schema";
import { ConfigService } from "@nestjs/config";
import { AdminCommentController } from "./admin-comment.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentController, AdminCommentController],
  providers: [CommentService, ConfigService],
})
export class CommentModule {}
