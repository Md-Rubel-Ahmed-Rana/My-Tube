import { Skeleton } from "@/components/ui/skeleton";

const VideoEditPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {Array.from({ length: 25 }).map((_, index) => {
        const width = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
        return (
          <Skeleton
            className={`h-4 bg-gray-300 dark:bg-gray-700 rounded-sm`}
            style={{ width: `${width}%` }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default VideoEditPageSkeleton;
