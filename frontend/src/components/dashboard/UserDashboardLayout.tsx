import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import UserDashboard from ".";

type Props = {
  children: ReactNode;
};

const UserDashboardLayout = ({ children }: Props) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen w-full">
      <SidebarProvider>
        <div className="flex max-w-[1440px] mx-auto w-full min-h-screen">
          {/* Sidebar on the left */}
          <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
            <UserSidebar />
          </div>

          {/* Main content on the right */}
          <main className="flex-1 pb-20">
            <UserDashboard />
            <div>{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserDashboardLayout;
