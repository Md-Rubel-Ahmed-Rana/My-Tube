import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class User {
  @Prop()
  name: string;

  @Prop({ index: true, unique: true })
  email: string;

  @Prop({ index: true, unique: true })
  username: string;

  @Prop({ index: true, unique: true })
  slug: string;

  @Prop()
  photo: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
