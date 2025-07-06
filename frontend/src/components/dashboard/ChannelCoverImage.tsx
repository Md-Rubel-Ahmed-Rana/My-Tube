/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.type";
import UpdateCoverImageModal from "./UpdateCoverImageModal";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { SquarePen } from "lucide-react";

type Props = {
  user: IUser;
  isLoading: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
};

const ChannelCoverImage = ({
  user,
  isLoading,
  setIsSidebarOpen,
  isSidebarOpen,
}: Props) => {
  const [isCoverImageChange, setIsCoverImageChange] = useState(false);
  const { open, isMobile } = useSidebar();

  return (
    <>
      {isLoading ? (
        <Skeleton className="lg:h-[60vh] h-[30vh] w-full bg-gray-300 dark:bg-gray-700 rounded-none" />
      ) : (
        <div className="lg:h-[60vh] h-[30vh] w-full relative">
          <img
            src={user?.coverImage || "/ChannelCoverImage.jpg"}
            alt="channel cover image"
            className="object-cover h-full w-full"
          />

          <Button
            onClick={() => setIsCoverImageChange(true)}
            className="absolute z-50 bottom-2 right-2"
          >
            {isMobile ? <SquarePen /> : <small>Change cover image</small>}
          </Button>
          {(!open || isMobile) && (
            <SidebarTrigger
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute z-50 top-2 bg-gray-600 text-white left-2"
            />
          )}
        </div>
      )}

      {isCoverImageChange && (
        <UpdateCoverImageModal
          id={user?.id}
          open={isCoverImageChange}
          setOpen={setIsCoverImageChange}
        />
      )}
    </>
  );
};

export default ChannelCoverImage;
