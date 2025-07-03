import AdminDashboard from "@/components/admin-dashboard";
import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";

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

export default AdminDashboardPage;
