import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useGetAllVideosByAdminQuery } from "@/features/videos";
import { IVideo } from "@/types/video.type";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const VideosList = () => {
  const { data, isLoading } = useGetAllVideosByAdminQuery(
    { page: 1, limit: 10000 },
    { refetchOnMountOrArgChange: true }
  );
  const videos = (data?.data?.videos || data?.data || []) as IVideo[];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-800 max-w-[400px] w-full"
          asChild
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="max-w-[500px] w-full justify-between"
          >
            Select a video...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[500px] w-full  bg-gray-100 dark:bg-gray-800 p-0">
          <Command className="bg-gray-100 dark:bg-gray-800 max-h-[300] h-full overflow-y-auto">
            <CommandInput placeholder="Search videos..." />
            <CommandEmpty>No video found.</CommandEmpty>
            <CommandGroup className="h-96 overflow-auto">
              {isLoading
                ? Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="px-4 py-2">
                      <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700  rounded" />
                    </div>
                  ))
                : videos.map((video) => (
                    <Link
                      onClick={() => setOpen(false)}
                      key={video?.id}
                      href={`/admin/dashboard/comments/video/?id=${video?.id}&title=${video?.title}`}
                    >
                      <CommandItem className="cursor-pointer dark:text-gray-200 text-gray-800">
                        <Check />
                        <span className="w-full truncate">{video?.title}</span>
                      </CommandItem>
                    </Link>
                  ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default VideosList;
