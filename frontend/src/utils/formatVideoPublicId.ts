export const formatVideoPublicId = (publicId: string): string => {
  return publicId.split("/").join("-");
};
