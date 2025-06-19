import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class Comment {
  @Prop()
  text: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Video", required: true })
  video: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
