import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class Category {
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  description?: string;

  @Prop({
    type: String,
    required: false,
  })
  slug?: string;

  @Prop({
    type: String,
    required: false,
  })
  icon_url?: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  is_active?: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  priority?: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
