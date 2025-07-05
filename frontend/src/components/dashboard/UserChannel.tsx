/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.type";
import { Camera } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NameUpdateForm from "./NameUpdateForm";
import UpdateProfileImageModal from "./UpdateProfileImageModal";
import UserChannelSkeleton from "@/skeletons/UserChannelSkeleton";

type Props = {
  user: IUser;
  isLoading: boolean;
};

const UserChannel = ({ isLoading, user }: Props) => {
  const [isNameUpdate, setIsNameUpdate] = useState(false);
  const [isPhotoChange, setIsPhotoChange] = useState(false);
  return (
    <>
      <div className="relative w-full border-b-2">
        {isLoading ? (
          <UserChannelSkeleton />
        ) : (
          <div className="px-4 mt-[-2rem] pb-4 flex flex-col md:flex-row gap-4">
            <div className="w-full flex flex-col md:flex-row lg:items-end justify-between gap-4">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user?.photo}
                  alt={user?.name || "profile"}
                  className="w-32 h-32 rounded-full ring-4 ring-white dark:ring-gray-800 object-cover"
                />
                <Camera
                  onClick={() => setIsPhotoChange(true)}
                  size={34}
                  className="absolute top-2 text-xl -right-1 cursor-pointer z-30 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 pointer-events-auto"
                />
              </div>

              {/* Channel Text Info */}
              <div className="flex-1">
                <h1 className="text-xl font-bold mt-2 sm:mt-0">
                  {user?.name || ""}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  @{user?.username || ""}
                </p>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <span>{user?.subscribers || 0} Subscribers</span>
                  <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500" />
                  <span>{user?.subscribed || 0} Subscribed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
                <Button
                  onClick={() => setIsNameUpdate(true)}
                  variant="secondary"
                >
                  Edit Channel
                </Button>
                <Link href={"/video/upload"}>
                  <Button>Upload Video</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {isNameUpdate && (
        <NameUpdateForm
          id={user?.id}
          name={user?.name}
          setOpen={setIsNameUpdate}
          open={isNameUpdate}
        />
      )}
      {isPhotoChange && (
        <UpdateProfileImageModal
          id={user?.id}
          open={isPhotoChange}
          setOpen={setIsPhotoChange}
        />
      )}
    </>
  );
};

export default UserChannel;
