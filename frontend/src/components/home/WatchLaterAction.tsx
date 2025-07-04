import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Clock } from "lucide-react";
import { toast } from "sonner";

const WatchLaterAction = () => {
  const handleAddToWatchLater = () => {
    toast.info("This feature is coming soon...");
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer mb-2 bg-gray-200 dark:bg-gray-700 w-full hover:bg-gray-300 dark:hover:bg-gray-600"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleAddToWatchLater();
      }}
    >
      <Clock className="mr-2 h-4 w-4" />
      Watch later
    </DropdownMenuItem>
  );
};

export default WatchLaterAction;
