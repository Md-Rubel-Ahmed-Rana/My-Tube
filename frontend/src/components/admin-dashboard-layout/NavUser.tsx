import { ChevronsUpDown, ImageIcon, KeyRound, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  useGetLoggedInAdminQuery,
  useUpdateAdminPasswordMutation,
} from "@/features/admin";
import { IAdmin } from "@/types/admin.type";
import AdminLogout from "./AdminLogout";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState } from "react";
import UpdateAdminProfileImageModal from "./UpdateAdminProfileImageModal";
import UpdateNameModal from "./UpdateNameModal";
import ChangePasswordModal from "../common/ChangePasswordModal";

const NavUser = () => {
  const { isMobile } = useSidebar();
  const { data } = useGetLoggedInAdminQuery({});
  const admin = data?.data as IAdmin;
  const [isProfileImageUpdate, setIsProfileImageUpdate] = useState(false);
  const [isNameUpdate, setIsNameUpdate] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [changePassword, { isLoading }] = useUpdateAdminPasswordMutation();
  return (
    <>
      <SidebarMenu className="p-2 border-t">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={admin?.photo} alt={admin?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{admin?.name}</span>
                  <span className="truncate text-xs">{admin?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width)  min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal ">
                <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={admin?.photo} alt={admin?.name} />
                    <AvatarFallback className="rounded-lg">
                      {admin?.name
                        .split(" ")
                        .map((word) => word[0].toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{admin?.name}</span>
                    <span className="truncate text-xs">{admin?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setIsNameUpdate(true)}
                  className="cursor-pointer"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Update name
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsProfileImageUpdate(true)}
                  className="cursor-pointer"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Change photo
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsUpdatePassword(true)}
                  className="cursor-pointer"
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change password
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ThemeSwitcher />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <AdminLogout />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      {isProfileImageUpdate && (
        <UpdateAdminProfileImageModal
          open={isProfileImageUpdate}
          setOpen={setIsProfileImageUpdate}
        />
      )}
      {isNameUpdate && (
        <UpdateNameModal
          id={admin?.id || admin?._id}
          name={admin?.name}
          open={isNameUpdate}
          setOpen={setIsNameUpdate}
        />
      )}
      {isUpdatePassword && (
        <ChangePasswordModal
          id={admin?.id || admin?._id}
          isUpdating={isLoading}
          reduxMutation={changePassword}
          open={isUpdatePassword}
          setOpen={setIsUpdatePassword}
        />
      )}
    </>
  );
};
export default NavUser;
