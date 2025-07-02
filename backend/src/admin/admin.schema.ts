import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class Admin {
  @Prop()
  name: string;

  @Prop({ index: true, unique: true })
  email: string;

  @Prop()
  photo: string;

  @Prop({ default: "admin" })
  role: string;

  @Prop()
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
