/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import VideoTags from "./VideoTags";
import { toast } from "sonner";
import VideoPlaylist from "./VideoPlaylist";

type Props = {
  form: any;
  isLoading: boolean;
  step: number;
  setStep: (step: number) => void;
};

const VideoUploadStepOne = ({ form, isLoading, setStep, step }: Props) => {
  const handleNextStep = () => {
    const values = form.getValues();
    if (values.title && values.description && values.tags.length > 0) {
      setStep(2);
    } else {
      toast.error(
        "Please fill in the title, description, and at least one tag before proceeding."
      );
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-muted-foreground" />
        <h4 className="font-medium">Video Details</h4>
      </div>

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

      <VideoTags form={form} isLoading={isLoading} />

      <VideoPlaylist form={form} isLoading={isLoading} />

      <div className="flex justify-between">
        <Button
          type="button"
          disabled={isLoading || step === 1}
          onClick={() => setStep(1)}
        >
          Prev
        </Button>
        <Button type="button" disabled={isLoading} onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default VideoUploadStepOne;
