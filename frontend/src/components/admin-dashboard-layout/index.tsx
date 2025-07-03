import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminDashboardHeader from "../admin-dashboard-layout/AdminDashboardHeader";
import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

type Props = {
  children: ReactNode;
};

const AdminDashboardLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-gray-100 dark:bg-gray-800">
        {/* dashboard header  */}
        <AdminDashboardHeader />
        {/* dynamic content  */}
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
