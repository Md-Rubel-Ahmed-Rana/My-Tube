import { Skeleton } from "@/components/ui/skeleton";

const PlaylistLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 border p-2 rounded-md bg-white dark:bg-gray-800 shadow"
        >
          <div className="flex justify-between gap-5 items-center">
            <Skeleton className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-6 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <Skeleton className="w-6 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-8/12 h-3 bg-gray-200 dark:bg-gray-700 mb-2" />
            <Skeleton className="w-10/12 h-3 bg-gray-200 dark:bg-gray-700 mb-2" />
            <Skeleton className="w-10/12 h-3 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div>
            <Skeleton className="w-full h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistLoadingSkeleton;
