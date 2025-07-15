import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const CategoryPagination = ({ page, setPage, totalPages }: Props) => {
  return (
    <div className="flex flex-col justify-end items-end gap-2">
      <span className="dark:text-gray-200 text-gray-800 px-2 text-sm">
        Page {page} of {totalPages}
      </span>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="dark:text-gray-200 text-gray-800 bg-gray-300 dark:bg-gray-700"
              onClick={() => {
                if (page > 1) setPage(Math.max(page - 1, 1));
              }}
              size={"sm"}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className="dark:text-gray-200 text-gray-800 bg-gray-300 dark:bg-gray-700"
              onClick={() => {
                if (page < totalPages) setPage(Math.min(page + 1, totalPages));
              }}
              size={"sm"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CategoryPagination;
