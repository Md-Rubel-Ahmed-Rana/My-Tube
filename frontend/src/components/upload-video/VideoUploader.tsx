import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud } from "lucide-react";

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

const VideoUploader = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      setError("Video must be less than 100MB.");
      setVideoFile(null);
      setVideoPreview(null);
      return;
    }

    setError(null);
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [],
    },
    multiple: false,
    maxSize: MAX_SIZE,
  });

  const handleUpload = () => {
    if (!videoFile) return;
    console.log("Uploading:", videoFile.name);
  };

  return (
    <div className="w-full flex justify-center items-center py-5 lg:py-10">
      <Card className="w-full max-w-xl mx-auto bg-gray-200 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Upload Your Video</CardTitle>
        </CardHeader>

        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 cursor-pointer ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto mb-2 h-8 w-8 text-gray-500" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Drop the video here..."
                : "Drag and drop a video file here, or click to select"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Only video files. Max size: 100MB.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {videoPreview && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <video
                src={videoPreview}
                controls
                className="w-full max-h-[250px] h-full rounded-lg border border-muted shadow"
              />
              <Button className="mt-4 w-full" onClick={handleUpload}>
                Upload Video
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUploader;
