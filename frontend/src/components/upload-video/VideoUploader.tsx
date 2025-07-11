import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud } from "lucide-react";
import { useJoinRoom } from "@/hooks/useJoinRoom";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

type Props = {
  setVideoFile: (videoFile: File | null) => void;
};

const VideoUploader = ({ setVideoFile }: Props) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [error, setError] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // connect socket.io
  useJoinRoom(user?.id || user?._id);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
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
    },
    [setVideoFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [],
    },
    multiple: false,
    maxSize: MAX_SIZE,
  });

  return (
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
        </div>
      )}
    </CardContent>
  );
};

export default VideoUploader;
