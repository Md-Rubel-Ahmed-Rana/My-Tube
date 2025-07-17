import { useEffect, useState } from "react";
import { toast } from "sonner";

interface VideoMetadata {
  title: string;
  tags: string[];
  description: string;
  category: string;
}

interface VideoData extends VideoMetadata {
  thumbnail: File | null;
  playlistId: string | null;
}

const useGetLocalStorageData = () => {
  const [data, setData] = useState<VideoData>({
    title: "",
    tags: [],
    description: "",
    category: "",
    thumbnail: null,
    playlistId: null,
  });

  useEffect(() => {
    const metadataFromStorage = localStorage.getItem("video-metadata");
    const thumbnailFromStorage = localStorage.getItem("thumbnail");
    const playlistId = localStorage.getItem("playlistId");

    let parsedMetadata: VideoMetadata = {
      title: "",
      tags: [],
      description: "",
      category: "",
    };

    if (metadataFromStorage) {
      try {
        parsedMetadata = JSON.parse(metadataFromStorage);
      } catch {
        toast.error("Failed to parse video metadata");
      }
    }

    if (thumbnailFromStorage) {
      const file = base64ToFile(thumbnailFromStorage, "thumbnail.png");
      setData((prev) => ({
        ...parsedMetadata,
        thumbnail: file,
        playlistId: prev.playlistId,
      }));
    } else {
      setData((prev) => ({
        ...parsedMetadata,
        thumbnail: null,
        playlistId: prev.playlistId,
      }));
    }

    if (playlistId) {
      const playlist = JSON.parse(playlistId);
      setData((prev) => ({
        ...parsedMetadata,
        thumbnail: prev.thumbnail,
        playlistId: playlist,
      }));
    } else {
      setData((prev) => ({
        ...parsedMetadata,
        thumbnail: prev.thumbnail,
        playlistId: null,
      }));
    }
  }, []);

  return data;
};

// Helper to convert base64 string to File
const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export default useGetLocalStorageData;
