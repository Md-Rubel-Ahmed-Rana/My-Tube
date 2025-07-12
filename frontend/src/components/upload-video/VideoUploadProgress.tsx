import { useGetLoggedInUserQuery } from "@/features/auth";
import { useJoinRoom } from "@/hooks/useJoinRoom";
import { IUser } from "@/types/user.type";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const VideoUploadProgress = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const socketRef = useJoinRoom(user?.id || user?._id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleProgress = ({ percent }: { percent: number }) => {
      setProgress(percent);
    };

    socket.on("video-upload-progress", handleProgress);

    // Cleanup
    return () => {
      socket.off("video-upload-progress", handleProgress);
      socket.disconnect();
    };
  }, [socketRef]);

  return (
    <Card className="max-w-md mx-auto mt-6 shadow-md border p-2 lg:p-4">
      <CardContent className="py-6 space-y-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </div>
        <Progress value={progress} className="h-4 w-full" />
        <p className="text-sm text-muted-foreground text-center">
          {progress.toFixed(0)}% uploaded
        </p>
      </CardContent>
    </Card>
  );
};

export default VideoUploadProgress;
