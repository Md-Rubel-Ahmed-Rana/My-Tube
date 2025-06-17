import { Skeleton } from "@/components/ui/skeleton";

const RelatedVideoLoadingSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 border p-2 rounded-lg"
        >
          <Skeleton className="h-16 w-[30%] rounded-2xl bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-3 w-full">
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedVideoLoadingSkeleton;
