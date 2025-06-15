import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchVideoForm = () => {
  return (
    <div className="flex-1 max-w-xl mx-4 relative">
      <Input placeholder="Search videos..." className="pl-10 pr-4" />
      <Search className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default SearchVideoForm;
