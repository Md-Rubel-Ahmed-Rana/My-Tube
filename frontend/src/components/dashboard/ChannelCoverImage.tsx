/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.type";
import UpdateCoverImageModal from "./UpdateCoverImageModal";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  user: IUser;
  isLoading: boolean;
};

const ChannelCoverImage = ({ user, isLoading }: Props) => {
  const [isCoverImageChange, setIsCoverImageChange] = useState(false);
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[60vh] w-full bg-gray-700 rounded-none" />
      ) : (
        <div className="h-[60vh] w-full relative">
          <img
            src={user?.coverImage || "/ChannelCoverImage.jpg"}
            alt="channel cover image"
            className="object-cover h-full w-full"
          />

          <Button
            onClick={() => setIsCoverImageChange(true)}
            className="absolute z-50 bottom-2 right-2"
          >
            Change cover image
          </Button>
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
