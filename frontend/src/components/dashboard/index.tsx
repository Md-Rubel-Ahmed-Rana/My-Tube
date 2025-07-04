import { useGetLoggedInUserQuery } from "@/features/auth";
import ChannelCoverImage from "./ChannelCoverImage";
import NavigationTabs from "./NavigationTabs";
import UserChannel from "./UserChannel";
import { IUser } from "@/types/user.type";

type Props = {
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
};

const UserDashboard = ({ setIsSidebarOpen, isSidebarOpen }: Props) => {
  const { data: userData, isLoading } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  return (
    <div className="w-full">
      <ChannelCoverImage
        user={user}
        isLoading={isLoading}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <UserChannel user={user} isLoading={isLoading} />
      <NavigationTabs />
    </div>
  );
};

export default UserDashboard;
