import { Skeleton } from "@/components/ui/skeleton";

const UserActivityLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            className="w-full  h-24 rounded-lg bg-gray-300 dark:bg-gray-700"
            key={index}
          />
        ))}
      </div>
      <Skeleton className="w-full  h-48 rounded-lg bg-gray-300 dark:bg-gray-700" />
    </div>
  );
};

export default UserActivityLoadingSkeleton;
