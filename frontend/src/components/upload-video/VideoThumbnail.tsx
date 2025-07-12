/* eslint-disable @next/next/no-img-element */
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThumbnailImageCrop from "./ThumbnailImageCrop";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const VideoThumbnail = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleFile = (file: File) => {
    setImageSrc(null);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
      setOpen(true);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    handleFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleContinue = () => {
    localStorage.setItem("thumbnail", imageSrc as string);
    router.push("/video/create/upload");
  };

  return (
    <div className="h-[80vh] w-full flex justify-center items-center p-2 lg:p-4">
      <Card className="w-full max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 px-2">
        <CardHeader>
          <CardTitle>Upload Video Thumbnail</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            {...getRootProps()}
            className={cn(
              "relative w-full aspect-video border-2 border-dashed rounded-lg transition cursor-pointer"
            )}
          >
            <input {...getInputProps()} />
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Thumbnail preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0a4 4 0 014 4v0a4 4 0 004 4h4m0 0v4a4 4 0 01-4 4H7"
                  />
                </svg>
                <p className="text-sm text-center">
                  {isDragActive
                    ? "Drop the image here..."
                    : "Click or drag your thumbnail image to upload"}
                </p>
              </div>
            )}
          </div>

          {imageSrc && (
            <div className="my-3 w-full px-3">
              <Button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue
              </Button>
            </div>
          )}

          {imageSrc && open && (
            <ThumbnailImageCrop
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              open={open}
              setOpen={setOpen}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoThumbnail;
