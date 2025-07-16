/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCategoriesQuery } from "@/features/category";
import { ICategory } from "@/types/category.type";
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
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  field: any;
};

const VideoCategoryList = ({ field }: Props) => {
  const { data } = useGetAllCategoriesQuery({ limit: 1000 });
  const categories = (data?.data?.categories || []) as ICategory[];

  const [open, setOpen] = useState(false);

  const selectedCategory = categories.find((cat) => cat.name === field.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory ? selectedCategory.name : "Select category"}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-gray-200 dark:bg-gray-700  p-0">
        <Command className="bg-gray-200 dark:bg-gray-700 ">
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No categories found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {categories.map((cat) => (
              <CommandItem
                key={cat.id}
                value={cat.name}
                className="cursor-pointer text-gray-800 dark:text-gray-200"
                onSelect={(currentValue) => {
                  field.onChange(
                    currentValue === field.value ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {cat.description}
                  </span>
                </div>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    cat.name === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default VideoCategoryList;
