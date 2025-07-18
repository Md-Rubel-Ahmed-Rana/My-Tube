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
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPlaylistsByAdminQuery } from "@/features/playlist";
import { IPlaylist } from "@/types/playlist.type";

type Props = {
  shouldShowNoData?: boolean;
};

const SelectPlaylist = ({ shouldShowNoData = true }: Props) => {
  const { data, isLoading } = useGetPlaylistsByAdminQuery({});
  const playlists = (data?.data || []) as IPlaylist[];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mt-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="dark:text-gray-200 text-gray-800 bg-gray-100 dark:bg-gray-800"
          asChild
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="max-w-[500px] w-full justify-between"
          >
            Select a playlist...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[500px] w-full   bg-gray-100 dark:bg-gray-800 p-0">
          <Command className="bg-gray-100 dark:bg-gray-800 max-h-[300] h-full overflow-y-auto">
            <CommandInput placeholder="Search videos..." />
            <CommandEmpty>No playlist found.</CommandEmpty>
            <CommandGroup className="h-96 overflow-auto">
              {isLoading
                ? Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="px-4 py-2">
                      <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700  rounded" />
                    </div>
                  ))
                : playlists.map((playlist) => (
                    <Link
                      onClick={() => setOpen(false)}
                      key={playlist?.id}
                      href={`/admin/dashboard/playlists/details/${playlist?.id}?name=${playlist?.name}`}
                    >
                      <CommandItem className="cursor-pointer dark:text-gray-200 text-gray-800">
                        <Check />
                        <span className="w-full truncate">
                          {playlist?.name}
                        </span>
                      </CommandItem>
                    </Link>
                  ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {!isLoading && (
        <>
          {shouldShowNoData && (
            <NoDataFound message="No playlist found">
              <p>You haven&apos;t selected any playlist yet</p>
            </NoDataFound>
          )}
        </>
      )}
    </div>
  );
};

export default SelectPlaylist;
