import { z } from "zod";

const MAX_DESC_LENGTH = 1000000;

export const uploadVideoSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),

  playlistId: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(MAX_DESC_LENGTH, {
      message: `Description must be at most ${MAX_DESC_LENGTH} characters long.`,
    }),

  tags: z
    .array(
      z.string().min(1, { message: "Each tag must be a non-empty string." })
    )
    .min(1, { message: "At least one tag is required." }),

  video: z.custom<File>((file) => file instanceof File, {
    message: "A valid video file is required.",
  }),

  thumbnail: z
    .custom<File>((file) => file instanceof File, {
      message: "A valid thumbnail file is required.",
    })
    .optional(),
});

export const videoEditSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(MAX_DESC_LENGTH, {
      message: `Description must be at most ${MAX_DESC_LENGTH} characters long.`,
    }),

  tags: z
    .array(
      z.string().min(1, { message: "Each tag must be a non-empty string." })
    )
    .min(1, { message: "At least one tag is required." }),
});
