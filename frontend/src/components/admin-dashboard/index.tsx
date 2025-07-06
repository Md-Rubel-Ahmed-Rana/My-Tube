import { UserAnalytics, VideosAnalytics } from "./analytics";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <UserAnalytics />
      <Separator />
      <VideosAnalytics />
    </div>
  );
};

export default AdminDashboard;
