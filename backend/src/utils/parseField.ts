import { BadRequestException } from "@nestjs/common";

export const parseField = (rawTags: any): string[] => {
  const input = typeof rawTags === "string" ? JSON.parse(rawTags) : rawTags;

  if (Array.isArray(input) && input.every((tag) => typeof tag === "string")) {
    return input;
  }

  throw new BadRequestException(
    "Invalid tags format. Must be a JSON array of strings."
  );
};
