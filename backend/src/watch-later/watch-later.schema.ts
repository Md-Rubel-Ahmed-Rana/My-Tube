import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type WatchLaterDocument = HydratedDocument<WatchLater>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class WatchLater {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  })
  user: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Video", default: null })
  video: Types.ObjectId;
}

export const WatchLaterSchema = SchemaFactory.createForClass(WatchLater);
