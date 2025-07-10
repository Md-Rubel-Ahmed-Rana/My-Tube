import { z } from "zod";
const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "").trim();

export const videoMetadataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  description: z
    .string()
    .refine(
      (val) => stripHtml(val).length >= 10,
      "Description must be at least 10 characters"
    ),
});

export type VideoMetadataSchema = z.infer<typeof videoMetadataSchema>;
