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
import { videoEditSchema } from "@/schemas/video.schema";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useUpdateVideoMutation } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import { useEffect, useState } from "react";

type Props = {
  video: IVideo;
};

const VideoEditForm = ({ video }: Props) => {
  const router = useRouter();
  const [editVideo, { isLoading }] = useUpdateVideoMutation();
  const form = useForm<z.infer<typeof videoEditSchema>>({
    resolver: zodResolver(videoEditSchema),
    defaultValues: {
      title: video?.title || "",
      tags: video?.tags || [],
      description: video?.description || "",
    },
    mode: "onChange",
  });

  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    const currentTags = form.getValues("tags");
    if (Array.isArray(currentTags)) {
      setTagsInput(currentTags.join(", "));
    }
  }, [form]);

  const handleSubmit = async (values: z.infer<typeof videoEditSchema>) => {
    await handleApiMutation(
      editVideo,
      { id: video?.id, updatedData: values },
      200,
      {
        success: "Video info updated successfully",
        error: "Video update failed",
      },
      {
        isRedirect: true,
        path: "/dashboard",
        router,
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6 border rounded-lg w-full"
      >
        <h2 className="text-center text-2xl font-semibold">
          Update Your Video
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
                  value={tagsInput}
                  onChange={(e) => {
                    const input = e.target.value;
                    setTagsInput(input);
                    field.onChange(
                      input
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VideoEditForm;
