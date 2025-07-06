import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import { UsersStats } from "@/components/users";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const UsersStatsPage = () => {
  return (
    <>
      <SEOHead title="Users Stats - MyTube" />
      <AdminDashboardLayout>
        <UsersStats />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(UsersStatsPage);
