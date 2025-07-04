import { Skeleton } from "@/components/ui/skeleton";

const UserChannelSkeleton = () => {
  return (
    <div className="flex items-end justify-between w-full">
      <div className="flex items-center gap-4">
        <Skeleton className="w-32 h-32 bg-gray-600 rounded-full" />
        <div className="mt-10 flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-[200px] bg-gray-700 h-5" />
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-end gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="w-[100px] bg-gray-700 h-5" />
        ))}
      </div>
    </div>
  );
};

export default UserChannelSkeleton;
