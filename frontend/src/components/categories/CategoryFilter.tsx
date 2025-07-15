import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ISort = "name" | "createdAt" | "priority";

const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
  { label: "Priority", value: "priority" },
];

type Props = {
  sortBy: ISort;
  setSortBy: (sortBy: ISort) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (sortOrder: "asc" | "desc") => void;
};

const CategoryFilter = ({
  setSortBy,
  setSortOrder,
  sortBy,
  sortOrder,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={(value: ISort) => setSortBy(value)}>
        <SelectTrigger className="w-40 dark:text-gray-200 text-gray-800">
          <SelectValue
            className="dark:text-gray-200 text-gray-800"
            placeholder="Sort By"
          />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? "Asc" : "Desc"}
      </Button>
    </div>
  );
};

export default CategoryFilter;
