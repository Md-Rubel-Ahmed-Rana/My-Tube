import { getSavedVideoFile } from "@/db/idb-keyval-video";
import { useEffect, useState } from "react";
const useGetUploadedVideo = () => {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  useEffect(() => {
    const fetchVideo = async () => {
      const video = await getSavedVideoFile();
      if (video) {
        setUploadedVideo(video);
      }
    };
    fetchVideo();
  }, []);

  return { video: uploadedVideo };
};

export default useGetUploadedVideo;
