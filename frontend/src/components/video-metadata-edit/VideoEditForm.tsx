import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { videoTags } from "@/constants/videoTags";
import {
  videoMetadataSchema,
  VideoMetadataSchema,
} from "@/schemas/videoMetadata";
import { useTheme } from "next-themes";
import { reactSelectStyles } from "@/utils/reactSelectStyles";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "../common/RichTextEditor";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { IVideo } from "@/types/video.type";
import { videoEditSchema } from "@/schemas/video.schema";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useUpdateVideoMutation } from "@/features/videos";
import { z } from "zod";
import VideoCategoryList from "../upload-video/VideoCategoryList";

const animatedComponents = makeAnimated();

type Props = {
  video: IVideo;
};

const VideoEditForm = ({ video }: Props) => {
  const router = useRouter();
  const { resolvedTheme: theme } = useTheme();
  const [editVideo, { isLoading }] = useUpdateVideoMutation();

  const form = useForm<VideoMetadataSchema>({
    resolver: zodResolver(videoMetadataSchema),
    defaultValues: {
      title: video?.title || "",
      tags: video?.tags || [],
      description: video?.description || "",
      category: video?.category || "",
    },
  });

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
        path: "/dashboard/videos",
        router,
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-2xl mx-auto mt-10 border p-2 lg:p-4 rounded-2xl"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter video title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <VideoCategoryList field={field} />
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
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <CreatableSelect
                  isMulti
                  components={animatedComponents}
                  options={videoTags}
                  onChange={(selected) =>
                    field.onChange(selected.map((s) => s.value))
                  }
                  value={field.value.map((val) => ({
                    label: val,
                    value: val,
                  }))}
                  placeholder="Select or create tags"
                  styles={reactSelectStyles((theme as string) || "light")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Description</FormLabel>
              <FormControl>
                <RichTextEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-20">
          <Button
            disabled={isLoading}
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 cursor-pointer px-4 text-white hover:bg-blue-700"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : " Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VideoEditForm;
