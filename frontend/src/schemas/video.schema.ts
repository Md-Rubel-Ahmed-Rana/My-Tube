import { z } from "zod";

export const uploadVideoSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),

  tags: z
    .array(
      z.string().min(1, { message: "Each tag must be a non-empty string." })
    )
    .min(1, { message: "At least one tag is required." }),

  video: z.custom<File>((file) => file instanceof File, {
    message: "A valid video file is required.",
  }),
});
