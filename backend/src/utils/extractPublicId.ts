export const extractPublicId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/");

    const uploadIndex = parts.findIndex((part) => part === "upload");

    if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) {
      return null;
    }

    const publicIdWithExtension = parts.slice(uploadIndex + 1).join("/");
    const lastDotIndex = publicIdWithExtension.lastIndexOf(".");

    if (lastDotIndex === -1) {
      return publicIdWithExtension;
    }

    return publicIdWithExtension.substring(0, lastDotIndex);
  } catch {
    return null;
  }
};
