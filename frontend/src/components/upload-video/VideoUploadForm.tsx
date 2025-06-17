import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { uploadVideoSchema } from "@/schemas/video.schema";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useState } from "react";
import { useUploadVideoMutation } from "@/features/videos";
import VideoPreviewCard from "./VideoPreviewCard";
import { validateVideoSize } from "@/utils/validateVideoSize";

const VideoUploadForm = () => {
  const router = useRouter();
  const [uploadVideo, { isLoading }] = useUploadVideoMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof uploadVideoSchema>>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      title: "",
      tags: [],
      video: undefined,
      description: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof uploadVideoSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("video", values.video as File);
    values.tags.forEach((tag) => formData.append("tags[]", tag));

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
        path: "/dashboard",
        router,
      }
    );
    form.reset();
  };

  // // prevent navigation and browser close
  // const message =
  //   "Your video is being uploaded. You can't navigate to other page or close the browser anymore until uploading finished.";
  // useNavigationBlocker(isLoading, message);
  // useBeforeUnload(isLoading, message);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6 border rounded-lg w-full"
      >
        <h2 className="text-center text-2xl font-semibold">
          Upload Your Video
        </h2>

        <FormField
          control={form.control}
          disabled={isLoading}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter video title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isLoading}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your video description here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isLoading}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="e.g. music, tutorial"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isLoading}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video (Max: 100MB)</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  className="cursor-pointer"
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const isValid = validateVideoSize(file);
                      if (isValid) {
                        field.onChange(file);
                        setSelectedFile(file);
                      } else {
                        e.target.value = "";
                        setSelectedFile(null);
                        field.onChange(null);
                      }
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedFile && <VideoPreviewCard video={selectedFile} />}

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VideoUploadForm;
