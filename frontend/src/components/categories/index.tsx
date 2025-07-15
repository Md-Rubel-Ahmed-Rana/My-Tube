import { useState } from "react";

import { useGetAllCategoriesQuery } from "@/features/category";
import { ICategory } from "@/types/category.type";

import CategoryTable from "./CategoryTable";
import CategorySearch from "./CategorySearch";
import CategoryFilter from "./CategoryFilter";
import CategoryPagination from "./CategoryPagination";

type ISort = "name" | "createdAt" | "priority";

const Categories = () => {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<ISort>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isFetching } = useGetAllCategoriesQuery({
    searchText: query,
    limit: 10,
    page,
    sortBy,
    sortOrder,
  });

  const categories = (data?.data?.categories as ICategory[]) || [];
  const totalPages = (data?.data?.totalPages as number) || 1;

  return (
    <div className="space-y-4 p-2 lg:px-4">
      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-end">
        {/* category search  */}
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <CategorySearch
            isFetching={isFetching}
            searchText={searchText}
            setPage={setPage}
            setQuery={setQuery}
            setSearchText={setSearchText}
          />

          {/* category filters  */}
          <CategoryFilter
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>

        {/* Pagination */}
        <CategoryPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>

      {/* Categories Table */}
      <CategoryTable
        categories={categories}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
};

export default Categories;
