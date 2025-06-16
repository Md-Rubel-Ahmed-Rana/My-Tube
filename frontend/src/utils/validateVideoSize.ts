import { toast } from "sonner";

export const MAX_VIDEO_SIZE_MB = 100;

export const validateVideoSize = (file: File): boolean => {
  const sizeInMB = file.size / (1024 * 1024);

  if (sizeInMB > MAX_VIDEO_SIZE_MB) {
    toast.error(
      `Video is too large. Maximum allowed size is ${MAX_VIDEO_SIZE_MB}MB.`
    );
    return false;
  }
  return true;
};
