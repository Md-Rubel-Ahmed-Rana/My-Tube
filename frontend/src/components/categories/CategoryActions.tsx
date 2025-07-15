import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICategory } from "@/types/category.type";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import CategoryUpdateModal from "./CategoryUpdateModal";

type Props = {
  category: ICategory;
};

const CategoryActions = ({ category }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEdit && (
        <CategoryUpdateModal
          category={category}
          open={isEdit}
          setOpen={setIsEdit}
        />
      )}
    </>
  );
};

export default CategoryActions;
