import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/features/auth";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const AdminLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      toast.success("Logged out successfully");
      window.location.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out");
    }
  };
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      {isLoading ? "Logging out..." : " Log out"}
    </DropdownMenuItem>
  );
};

export default AdminLogout;
