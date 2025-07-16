import { set, get, del } from "idb-keyval";

export const saveVideoFile = async (file: File) => {
  await set("uploaded-video", file);
};

export const getSavedVideoFile = async () => {
  return await get<File>("uploaded-video");
};

export const clearSavedVideoFile = async () => {
  await del("uploaded-video");
};
