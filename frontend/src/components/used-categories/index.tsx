import { useGetUsedCategoriesQuery } from "@/features/category";
import { ICategory } from "@/types/category.type";
import CategoryTable from "../categories/CategoryTable";

const UsedCategories = () => {
  const { data, isLoading } = useGetUsedCategoriesQuery({});
  const categories = (data?.data || []) as ICategory[];
  return (
    <div className="p-2 lg:px-4">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Categories already used in videos
      </h1>
      <CategoryTable categories={categories} isLoading={isLoading} />
    </div>
  );
};

export default UsedCategories;
