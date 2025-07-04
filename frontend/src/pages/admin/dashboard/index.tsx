import AdminDashboard from "@/components/admin-dashboard";
import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const AdminDashboardPage = () => {
  return (
    <>
      <SEOHead title="Dashboard - MyTube" />
      <AdminDashboardLayout>
        <AdminDashboard />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(AdminDashboardPage);
