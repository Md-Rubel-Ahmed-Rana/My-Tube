/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { validateVideoSize } from "@/utils/validateVideoSize";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import VideoPreviewCard from "./VideoPreviewCard";
import { Button } from "@/components/ui/button";
import { GalleryVertical } from "lucide-react";
import VideoThumbnailUpload from "./VideoThumbnailUpload";

type Props = {
  form: any;
  isLoading: boolean;
  setStep: (step: number) => void;
  step?: number;
};

const VideoUploadStepTwo = ({ form, isLoading, setStep, step }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    form.getValues("video") || null
  );

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-2">
        <GalleryVertical className="w-5 h-5 text-muted-foreground" />
        <h4 className="font-medium">Choose Media</h4>
      </div>

      <FormField
        control={form.control}
        disabled={isLoading}
        name="video"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Video File (Max: 100MB)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="video/*"
                className="cursor-pointer"
                disabled={isLoading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const isValid = validateVideoSize(file);
                    if (isValid) {
                      form.setValue("video", file);
                      field.onChange(file);
                      setSelectedFile(file);
                    } else {
                      e.target.value = "";
                      field.onChange(null);
                      setSelectedFile(null);
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

      <VideoThumbnailUpload form={form} isLoading={isLoading} step={step} />

      <div className="flex justify-between">
        <Button type="button" onClick={() => setStep(1)} disabled={isLoading}>
          Prev
        </Button>
        <Button type="submit" disabled={isLoading || !form.formState.isValid}>
          {isLoading ? "Uploading..." : "Upload Video"}
        </Button>
      </div>
    </div>
  );
};

export default VideoUploadStepTwo;
