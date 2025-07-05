import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode, useState } from "react";
import UserSidebar from "./UserSidebar";
import UserDashboard from ".";

type Props = {
  children: ReactNode;
};

const UserDashboardLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen w-full">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {/* Sidebar */}
          <div
            className={`h-screen sticky top-0 z-30 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
              transition-all duration-300 ease-in-out 
              ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}
          >
            <UserSidebar setIsSidebarOpen={setIsSidebarOpen} />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-20">
            <UserDashboard
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
            />
            <div>{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserDashboardLayout;
