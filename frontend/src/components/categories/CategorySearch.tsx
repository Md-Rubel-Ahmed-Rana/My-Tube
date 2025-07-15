import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  setPage: (value: number) => void;
  setQuery: (value: string) => void;
  setSearchText: (value: string) => void;
  searchText: string;
  isFetching: boolean;
};

const CategorySearch = ({
  isFetching,
  searchText,
  setPage,
  setQuery,
  setSearchText,
}: Props) => {
  const handleSearch = () => {
    setPage(1);
    setQuery(searchText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search categories..."
        className="w-full sm:w-64 dark:text-gray-200 text-gray-800"
      />
      <Button onClick={handleSearch} disabled={isFetching}>
        Search
      </Button>
    </div>
  );
};

export default CategorySearch;
