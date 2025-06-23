import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class Video extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false, default: "" })
  description: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ required: false })
  thumbnailUrl: string;

  @Prop({ index: true, required: true })
  publicId: string;

  @Prop({ index: true, required: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  owner: Types.ObjectId;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: [] })
  likes: Types.ObjectId[];

  @Prop({ default: [] })
  dislikes: Types.ObjectId[];

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: null })
  duration: number;

  @Prop({ default: null })
  size: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
