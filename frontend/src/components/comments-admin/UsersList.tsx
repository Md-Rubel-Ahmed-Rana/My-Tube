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
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUserByAdminQuery } from "@/features/user";
import { IUser } from "@/types/user.type";

const UsersList = () => {
  const { data, isLoading } = useGetAllUserByAdminQuery({});
  const users = (data?.data || []) as IUser[];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-w-[400px] w-full"
          asChild
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select an user...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[500px] w-full  bg-gray-100 dark:bg-gray-800 p-0">
          <Command className="bg-gray-100 dark:bg-gray-800 max-h-[300] h-full overflow-y-auto">
            <CommandInput placeholder="Search user..." />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup className="h-96 overflow-auto">
              {isLoading
                ? Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="px-4 py-2">
                      <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700  rounded" />
                    </div>
                  ))
                : users.map((user) => (
                    <Link
                      onClick={() => setOpen(false)}
                      key={user?.id}
                      href={`/admin/dashboard/comments/user/?id=${user?.id}&name=${user?.name}`}
                    >
                      <CommandItem className="cursor-pointer text-gray-800 dark:text-gray-200">
                        <Check />
                        <span className="w-full truncate">{user?.name}</span>
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

export default UsersList;
