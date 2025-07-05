import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class Channel {
  // who subscribed
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  })
  user: Types.ObjectId;

  // whose subscribed
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: "User", default: [] })
  channels: Types.ObjectId[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
