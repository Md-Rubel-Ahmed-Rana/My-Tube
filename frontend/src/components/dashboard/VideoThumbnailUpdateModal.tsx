/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useUpdateThumbnailMutation } from "@/features/videos";

type Props = {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const VideoThumbnailUpdateModal = ({ id, open, setOpen }: Props) => {
  const [updateThumbnail, { isLoading }] = useUpdateThumbnailMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("thumbnail", selectedFile);

    await handleApiMutation(updateThumbnail, { id, formData }, 200, {
      success: "✅ Video thumbnail updated successfully!",
      error: "❌ Failed to update video thumbnail.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Update Video Thumbnail</DialogTitle>
          <DialogDescription>
            Upload a new thumbnail image for your video. Max size 5MB. JPG or
            PNG only.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            disabled={isLoading}
            className="dark:text-gray-200 text-gray-800"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Thumbnail Preview"
              className="w-full max-h-48 h-auto object-cover rounded-md mx-auto border"
            />
          )}
        </div>

        <DialogFooter className="flex justify-between w-full mt-4">
          <DialogClose asChild>
            <Button disabled={isLoading}>Cancel</Button>
          </DialogClose>
          <Button
            variant="secondary"
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
            className="bg-gray-300 dark:bg-gray-800"
          >
            {isLoading ? "Updating..." : "Update Thumbnail"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoThumbnailUpdateModal;
