import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import Admins from "@/components/admins";
import SEOHead from "@/components/common/SEOHead";

const AdminDashboardPage = () => {
  return (
    <>
      <SEOHead title="Admins - MyTube" />
      <AdminDashboardLayout>
        <Admins />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminDashboardPage;
