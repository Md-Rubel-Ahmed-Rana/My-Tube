import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SystemInfo from "./SystemInfo";
import NavUser from "./NavUser";
import SideNavItems from "./SideNavItems";

const AdminSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-gray-800">
        <SystemInfo />
      </SidebarHeader>
      <SidebarContent className="bg-gray-800">
        <SideNavItems />
      </SidebarContent>
      <SidebarFooter className="p-0 bg-gray-800">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
