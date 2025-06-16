import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
    },
  });

  const handleSubmit = async (values: z.infer<typeof uploadVideoSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("video", values.video as File);
    values.tags.forEach((tag) => formData.append("tags[]", tag));

    await handleApiMutation(uploadVideo, formData, 201, {
      success: "Video uploaded successfully",
      error: "Video upload failed",
    });

    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6 border rounded-lg w-full max-w-lg mx-auto"
      >
        <h2 className="text-center text-2xl font-semibold">
          Upload Your Video
        </h2>

        <FormField
          control={form.control}
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input
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
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      setSelectedFile(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedFile && (
          <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>
        )}

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
