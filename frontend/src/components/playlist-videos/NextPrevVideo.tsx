import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NextPrevVideo = () => {
  return (
    <div className="flex gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 mb-4">
      <Button size="icon" variant="outline">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NextPrevVideo;
