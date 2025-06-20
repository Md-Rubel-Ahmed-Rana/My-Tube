import { Skeleton } from "@/components/ui/skeleton";

const CommentLoadingSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 border p-2 rounded-lg"
        >
          <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-[250px] bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-[150px] bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-full lg:w-8/12 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentLoadingSkeleton;
