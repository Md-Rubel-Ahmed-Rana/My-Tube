/* eslint-disable react-hooks/exhaustive-deps */
import { uploadVideoSchema } from "@/schemas/video.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import VideoUploadStepOne from "./VideoUploadStepOne";
import VideoUploadStepTwo from "./VideoUploadStepTwo";
import { useUploadVideoMutation } from "@/features/videos";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/router";

const VideoUploadForm = () => {
  const [step, setStep] = useState(1);
  const [uploadVideo, { isLoading }] = useUploadVideoMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof uploadVideoSchema>>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      title: "",
      tags: [],
      video: undefined,
      thumbnail: undefined,
      description: "",
      playlistId: "",
    },
  });

  const watchedVideo = form.watch("video");
  const watchedTags = form.watch("tags");

  const persistedVideoRef = useRef<File | undefined>(null);

  useEffect(() => {
    if (watchedVideo) {
      persistedVideoRef.current = watchedVideo;
    }
  }, [watchedVideo]);

  useEffect(() => {
    form.setValue("tags", watchedTags);
    if (persistedVideoRef.current) {
      form.setValue("video", persistedVideoRef.current);
    }
  }, [step]);

  const handleSubmit = async (data: z.infer<typeof uploadVideoSchema>) => {
    if (data.playlistId === "" && !data.playlistId) {
      delete data.playlistId;
    }
    if (data.thumbnail === null || data.thumbnail === undefined) {
      delete data.thumbnail;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", data.video);
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
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6 border rounded-lg w-full"
      >
        <div className="flex flex-col gap-4">
          <h4 className="text-center font-semibold text-lg">Upload Video</h4>
          {step === 1 && (
            <VideoUploadStepOne
              form={form}
              isLoading={isLoading}
              step={step}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <VideoUploadStepTwo
              form={form}
              isLoading={isLoading}
              setStep={setStep}
              step={step}
            />
          )}
        </div>
      </form>
    </Form>
  );
};

export default VideoUploadForm;
