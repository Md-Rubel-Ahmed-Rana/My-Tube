import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserActivityDocument = HydratedDocument<UserActivity>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class UserActivity {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user: Types.ObjectId;

  @Prop({ default: 0 })
  videosWatched: number;

  @Prop({ default: 0 })
  minutesWatched: number;

  @Prop([
    {
      video: { type: Types.ObjectId, ref: "Video" },
      watchedAt: { type: Date, default: Date.now },
      duration: { type: Number },
    },
  ])
  watchHistory: {
    video: Types.ObjectId;
    watchedAt: Date;
    duration: number;
  }[];

  @Prop({ default: 0 })
  likesGiven: number;

  @Prop({ default: 0 })
  commentsMade: number;

  @Prop({ default: 0 })
  videosUploaded: number;

  @Prop({ default: 0 })
  subscribers: number;
}

export const UserActivitySchema = SchemaFactory.createForClass(UserActivity);
