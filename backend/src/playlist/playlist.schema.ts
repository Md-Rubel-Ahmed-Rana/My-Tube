import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";
import { PlaylistStatus } from "./enums";

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class Playlist {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  })
  user: Types.ObjectId;

  @Prop({ index: true, required: true })
  slug: string;

  @Prop({
    type: String,
    enum: PlaylistStatus,
    default: PlaylistStatus.PUBLIC,
  })
  status: PlaylistStatus;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: "Video", default: [] })
  videos: Types.ObjectId[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);

PlaylistSchema.virtual("videoCount").get(function () {
  return this.videos.length;
});
