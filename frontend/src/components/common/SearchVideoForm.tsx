import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const SearchVideoForm = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/results?search_query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex-1 max-w-xl mx-4 relative">
      <Input
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search videos..."
        className="pl-10 pr-4 py-0"
        value={searchQuery}
      />
      <Search className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default SearchVideoForm;
