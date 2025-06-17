import { Skeleton } from "@/components/ui/skeleton";

const VideoLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col space-y-3 rounded-md px-1 py-3 bg-gray-200 dark:bg-gray-800 border"
        >
          <Skeleton className="h-[125px] w-full rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[95%] bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-3 w-[70%] bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
            </div>
            <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoLoadingSkeleton;
