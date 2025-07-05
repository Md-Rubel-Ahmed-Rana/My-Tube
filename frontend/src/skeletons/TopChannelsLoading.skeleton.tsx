import { Skeleton } from "@/components/ui/skeleton";

const TopChannelsLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex items-center gap-2 w-full" key={index}>
          <Skeleton className="w-10  h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex flex-col gap-2 w-10/12">
            <Skeleton className="w-full  h-3 bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-10  h-2 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="w-10  h-2 bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopChannelsLoadingSkeleton;
