import { useUpdateVideoStatusMutation } from "@/features/videos";
import { VideoStatus } from "@/types/video.type";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  id: string;
  status: VideoStatus;
};

const VideoStatuses = ({ id, status }: Props) => {
  const [update, { isLoading }] = useUpdateVideoStatusMutation();
  const handleUpdateVideoStatus = async () => {
    await handleApiMutation(
      update,
      {
        id,
        status:
          status === VideoStatus.PUBLISHED
            ? VideoStatus.PRIVATE
            : VideoStatus.PUBLISHED,
      },
      200
    );
  };
  return (
    <>
      {status === VideoStatus.PUBLISHED ? (
        <button
          disabled={isLoading}
          onClick={handleUpdateVideoStatus}
          className="cursor-pointer"
        >
          Make Private
        </button>
      ) : (
        <button
          disabled={isLoading}
          onClick={handleUpdateVideoStatus}
          className="cursor-pointer"
        >
          Make Publish
        </button>
      )}
    </>
  );
};

export default VideoStatuses;
