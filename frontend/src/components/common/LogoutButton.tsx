import { useLogoutMutation } from "@/features/auth";
import { toast } from "sonner";

const LogoutButton = () => {
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
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full cursor-pointer font-serif bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
