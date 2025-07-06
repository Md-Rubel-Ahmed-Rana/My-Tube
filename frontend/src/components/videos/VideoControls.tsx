/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import VideoSearchForm from "./VideoSearchForm";

type Props = {
  page: number;
  setPage: any;
  total: number;
  limit: number;
  totalPages: number;
  setSearchText: (value: string) => void;
};

const VideoControls = ({
  limit,
  page,
  setPage,
  total,
  totalPages,
  setSearchText,
}: Props) => {
  const handlePrev = () => {
    if (page > 1) setPage((prev: number) => prev - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage((prev: number) => prev + 1);
  };

  return (
    <div className="flex items-center justify-between mb-4 w-full">
      <VideoSearchForm setSearchText={setSearchText} />
      <div>
        {total > limit && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  <PaginationPrevious />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={page === totalPages}
                >
                  <PaginationNext />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default VideoControls;
