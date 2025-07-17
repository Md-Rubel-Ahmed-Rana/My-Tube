/* eslint-disable @next/next/no-img-element */
import { IUser } from "@/types/user.type";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  user: IUser;
  isLoading: boolean;
};

const ChannelCoverImage = ({ user, isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <Skeleton className="lg:h-[40vh] h-[30vh] w-full bg-gray-300 dark:bg-gray-700 rounded-none" />
      ) : (
        <div className="lg:h-[40vh] h-[30vh] w-full relative">
          <img
            src={user?.coverImage || "/ChannelCoverImage.jpg"}
            alt="channel cover image"
            className="object-cover h-full w-full"
          />
        </div>
      )}
    </>
  );
};

export default ChannelCoverImage;
