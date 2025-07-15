import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategory } from "@/types/category.type";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CategoryActions from "./CategoryActions";

type Props = {
  isLoading: boolean;
  categories: ICategory[];
};

const CategoryTable = ({ categories = [], isLoading }: Props) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="dark:text-gray-200 text-gray-800">
              Name
            </TableHead>
            <TableHead className="dark:text-gray-200 text-gray-800">
              Slug
            </TableHead>
            <TableHead className="dark:text-gray-200 text-gray-800">
              Description
            </TableHead>
            <TableHead className="dark:text-gray-200 text-gray-800">
              Priority
            </TableHead>
            <TableHead className="dark:text-gray-200 text-gray-800">
              Active
            </TableHead>
            <TableHead className="dark:text-gray-200 text-gray-800">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center dark:text-gray-200 text-gray-800 py-6"
              >
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center dark:text-gray-200 text-gray-800"
              >
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            categories?.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell className="dark:text-gray-200 text-gray-800">
                  {cat.name}
                </TableCell>
                <TableCell className="dark:text-gray-200 text-gray-800">
                  {cat.slug}
                </TableCell>
                <TableCell className="dark:text-gray-200 text-gray-800">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          {cat.description.length > 30
                            ? cat.description.slice(0, 30) + "..."
                            : cat.description}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{cat.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="dark:text-gray-200 text-gray-800">
                  {cat.priority}
                </TableCell>
                <TableCell className="dark:text-gray-200 text-gray-800">
                  {cat.is_active ? "Yes" : "No"}
                </TableCell>
                <TableCell className="dark:text-gray-200 text-gray-800">
                  <CategoryActions category={cat} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
