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
import VideoCategoryList from "./VideoCategoryList";
import useGetLocalStorageData from "@/hooks/useGetLocalStorageData";
import { useEffect } from "react";

const animatedComponents = makeAnimated();

const VideoMetadata = () => {
  const router = useRouter();
  const { resolvedTheme: theme } = useTheme();
  const data = useGetLocalStorageData();

  const form = useForm<VideoMetadataSchema>({
    resolver: zodResolver(videoMetadataSchema),
    defaultValues: {
      title: "",
      tags: [],
      description: "",
      category: "",
    },
  });

  const onSubmit = (data: VideoMetadataSchema) => {
    localStorage.setItem("video-metadata", JSON.stringify(data));
    router.push("/video/create/playlist");
  };

  // set default values from local storage
  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title || "",
        tags: data.tags || [],
        description: data.description || "",
        category: data.category || "",
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
          <Button>Prev</Button>
          <Button
            className="bg-blue-600 cursor-pointer px-4 text-white hover:bg-blue-700"
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VideoMetadata;
