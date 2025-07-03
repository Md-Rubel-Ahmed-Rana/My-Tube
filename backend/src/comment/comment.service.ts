import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    await this.commentModel.create(createCommentDto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Comment added successfully",
      data: null,
    };
  }

  async findAll() {
    const comments = await this.commentModel
      .find({})
      .populate("user", "-password")
      .populate("video", "title");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
    };
  }

  async findAllByVideo(videoId: Types.ObjectId) {
    const comments = await this.commentModel
      .find({ video: new Types.ObjectId(videoId) })
      .populate("user", "-password")
      .populate("video", "title");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comments by video retrieved successfully",
      data: comments,
    };
  }

  async findOne(id: Types.ObjectId) {
    const comment = await this.commentModel
      .findById(id)
      .populate("user", "-password")
      .populate("video", "title");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment retrieved successfully",
      data: comment,
    };
  }

  async update(id: Types.ObjectId, text: string) {
    await this.commentModel.findByIdAndUpdate(id, { $set: { text } });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment updated successfully",
      data: null,
    };
  }

  async remove(id: Types.ObjectId) {
    await this.commentModel.findByIdAndDelete(id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Comment deleted successfully",
      data: null,
    };
  }
}
