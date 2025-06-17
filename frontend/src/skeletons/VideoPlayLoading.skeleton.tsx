import { Skeleton } from "@/components/ui/skeleton";

const VideoPlayerPageSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 rounded-md p-2">
      <Skeleton className="h-[30vh] lg:h-[70vh] w-full rounded-md bg-gray-400 dark:bg-gray-700" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[95%] bg-gray-400 dark:bg-gray-700" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-16 bg-gray-400 dark:bg-gray-700" />
        <Skeleton className="h-4 w-16 bg-gray-400 dark:bg-gray-700" />
        <Skeleton className="h-4 w-24 bg-gray-400 dark:bg-gray-700" />
      </div>
      <Skeleton className="h-3 w-[80%] bg-gray-400 dark:bg-gray-700" />
      <Skeleton className="h-3 w-[85%] bg-gray-400 dark:bg-gray-700" />
      <Skeleton className="h-3 w-[70%] bg-gray-400 dark:bg-gray-700" />
    </div>
  );
};

export default VideoPlayerPageSkeleton;
