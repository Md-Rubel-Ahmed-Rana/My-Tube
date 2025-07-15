import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  is_active: z.boolean().default(true),
  priority: z.number().min(1, "Priority must be at least 1"),
});

export type ICategorySchema = z.infer<typeof categorySchema>;
