import { useUploadVideoMutation } from "@/features/videos";
import useGetLocalStorageData from "@/hooks/useGetLocalStorageData";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import VideoUploadProgress from "./VideoUploadProgress";
import VideoUploader from "./VideoUploader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PreviewVideoUploads from "./PreviewVideoUploads";
import { clearSavedVideoFile, saveVideoFile } from "@/db/idb-keyval-video";
import useGetUploadedVideo from "@/hooks/useGetUploadedVideo";

const UploadVideo = () => {
  const [uploadVideo, { isLoading }] = useUploadVideoMutation();
  const router = useRouter();
  const { video: savedVideo } = useGetUploadedVideo();
  const data = useGetLocalStorageData();
  const [video, setVideo] = useState<File | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("video", video as unknown as File);
    data.tags.forEach((tag) => formData.append("tags[]", tag));
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    if (data.playlistId) {
      formData.append("playlistId", data.playlistId);
    }

    await handleUploadVideo(formData);
  };

  const handleUploadVideo = async (formData: FormData) => {
    await handleApiMutation(
      uploadVideo,
      formData,
      201,
      {
        success: "Video uploaded successfully",
        error: "Video upload failed",
      },
      {
        isRedirect: true,
        path: "/dashboard/videos",
        router,
      }
    );
    localStorage.removeItem("thumbnail");
    localStorage.removeItem("video-metadata");
    localStorage.removeItem("playlistId");
    await clearSavedVideoFile();
  };

  const handlePreview = async () => {
    if (video) {
      await saveVideoFile(video);
      setIsPreviewMode(true);
    }
  };

  // store saved video on the state if exist
  useEffect(() => {
    if (!video) {
      if (savedVideo) {
        setVideo(savedVideo);
        setVideoPreview(URL.createObjectURL(savedVideo));
      }
    }
  }, [savedVideo, video]);

  return (
    <div>
      {isLoading ? (
        <VideoUploadProgress />
      ) : (
        <>
          {isPreviewMode ? (
            <PreviewVideoUploads
              setIsPreviewMode={setIsPreviewMode}
              handleUploadVideo={handleSubmit}
            />
          ) : (
            <div className="w-full flex justify-center items-center py-5 px-2 lg:px-4 lg:py-10">
              <Card className="w-full max-w-xl mx-auto bg-gray-200 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Upload Your Video</CardTitle>
                </CardHeader>
                <VideoUploader
                  setVideoFile={setVideo}
                  setVideoPreview={setVideoPreview}
                  videoPreview={videoPreview}
                />
                {video && (
                  <div className="flex justify-between w-full mt-4 px-2">
                    <Button onClick={handlePreview}>Preview</Button>
                    <Button onClick={handleSubmit}>Upload Video</Button>
                  </div>
                )}
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UploadVideo;
