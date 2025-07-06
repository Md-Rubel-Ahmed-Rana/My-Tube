import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import UserActivities from "./UserActivities";
import { useEffect } from "react";
import TopChannels from "./TopChannels";
import WatchHistory from "./WatchHistory";

type Props = {
  setIsSidebarOpen: (value: boolean) => void;
  setIsMobileDevice: (value: boolean) => void;
};

const UserSidebar = ({ setIsSidebarOpen }: Props) => {
  const { open } = useSidebar();

  useEffect(() => {
    setIsSidebarOpen(open);
  }, [open, setIsSidebarOpen]);

  return (
    <Sidebar>
      <SidebarContent className="bg-gray-200 dark:bg-gray-800 p-2">
        <UserActivities />
        <TopChannels />
        <WatchHistory />
      </SidebarContent>
    </Sidebar>
  );
};

export default UserSidebar;
