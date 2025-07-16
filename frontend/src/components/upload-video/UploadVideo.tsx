import { useUploadVideoMutation } from "@/features/videos";
import useGetLocalStorageData from "@/hooks/useGetLocalStorageData";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import VideoUploadProgress from "./VideoUploadProgress";
import VideoUploader from "./VideoUploader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const UploadVideo = () => {
  const [uploadVideo, { isLoading }] = useUploadVideoMutation();
  const router = useRouter();
  const data = useGetLocalStorageData();
  const [video, setVideo] = useState<File | null>(null);

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
  };

  return (
    <div>
      {isLoading ? (
        <VideoUploadProgress />
      ) : (
        <div className="w-full flex justify-center items-center py-5 px-2 lg:px-4 lg:py-10">
          <Card className="w-full max-w-xl mx-auto bg-gray-200 dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Upload Your Video</CardTitle>
            </CardHeader>
            <VideoUploader setVideoFile={setVideo} />
            {video && (
              <Button className="mt-4 w-11/12 mx-auto" onClick={handleSubmit}>
                Upload Video
              </Button>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
