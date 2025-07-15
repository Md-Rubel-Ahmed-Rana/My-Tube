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
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/features/category";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  category: ICategory;
};

const CategoryActions = ({ category }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [remove, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [update, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const handleDeleteCategory = async () => {
    await handleApiMutation(remove, { id: category?.id }, 200);
  };

  const handleActiveDeactivateCategory = async () => {
    await handleApiMutation(
      update,
      { id: category?.id, data: { is_active: !category.is_active } },
      200
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={handleActiveDeactivateCategory}
            disabled={isUpdating}
            className="cursor-pointer"
          >
            {category?.is_active ? "Deactivate" : "Active"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleDeleteCategory}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
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
