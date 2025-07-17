/* eslint-disable @next/next/no-img-element */
import { IUser } from "@/types/user.type";
import UserChannelSkeleton from "@/skeletons/UserChannelSkeleton";
import SubscriptionButton from "../video/SubscriptionButton";

type Props = {
  user: IUser;
  isLoading: boolean;
};

const UserChannel = ({ isLoading, user }: Props) => {
  return (
    <div className="relative w-full border-b-2">
      {/* Channel Info */}
      <div className="px-4 lg:px-10 mt-[-2rem] pb-4 flex flex-col sm:flex-row items-center sm:items-end gap-4">
        {isLoading ? (
          <UserChannelSkeleton />
        ) : (
          <>
            {/* Profile Image */}
            <div className="relative">
              <img
                src={user?.photo}
                alt={user?.name || "profile"}
                className="w-32 h-32 rounded-full ring-4 ring-white dark:ring-gray-800 object-cover"
              />
            </div>

            {/* Channel Text Info */}
            <div className="flex-1 space-y-1">
              <h1 className="text-xl font-bold mt-2 sm:mt-0">
                {user?.name || ""}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <p>@{user?.username || ""}</p>
                <span className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-600" />
                <span>{user?.subscribers || 0} Subscribers</span>
              </div>
              <SubscriptionButton channelId={user?.id || user?._id} />
              {/* <div className="flex items-center gap-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
                <span>{user?.subscribers || 0} Subscribers</span>
              </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserChannel;
