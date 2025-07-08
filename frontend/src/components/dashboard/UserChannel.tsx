/* eslint-disable @next/next/no-img-element */
import { IUser } from "@/types/user.type";
import { Camera } from "lucide-react";
import { useState } from "react";
import UserChannelSkeleton from "@/skeletons/UserChannelSkeleton";
import UserChannelActions from "./UserChannelActions";

type Props = {
  user: IUser;
  isLoading: boolean;
};

const UserChannel = ({ isLoading, user }: Props) => {
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
              <div className="relative w-32 h-32">
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
                <div className="flex justify-between">
                  <h1 className="lg:text-xl text-lg font-bold mt-2 sm:mt-0">
                    {user?.name || ""}
                  </h1>
                  <div className="block lg:hidden">
                    <UserChannelActions
                      user={user}
                      isPhotoChange={isPhotoChange}
                      setIsPhotoChange={setIsPhotoChange}
                    />
                  </div>
                </div>
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
              <div className="lg:block hidden">
                <UserChannelActions
                  user={user}
                  isPhotoChange={isPhotoChange}
                  setIsPhotoChange={setIsPhotoChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserChannel;
