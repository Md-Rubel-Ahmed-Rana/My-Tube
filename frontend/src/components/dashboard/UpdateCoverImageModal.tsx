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
import { useUpdateCoverImageMutation } from "@/features/user";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const UpdateCoverImageModal = ({ id, open, setOpen }: Props) => {
  const [updateCoverImage, { isLoading }] = useUpdateCoverImageMutation();
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
    formData.append("coverImage", selectedFile);

    await handleApiMutation(updateCoverImage, { id, formData }, 200, {
      success: "✅ Cover image updated successfully!",
      error: "❌ Failed to update Cover image.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Update cover image</DialogTitle>
          <DialogDescription>
            Choose a new cover image. Max size 5MB. Only JPG, PNG allowed.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="dark:text-gray-200 cursor-pointer text-gray-800"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-32 rounded-lg mx-auto border"
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
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCoverImageModal;
