import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import CreateAdmin from "@/components/admins/CreateAdmin";
import SEOHead from "@/components/common/SEOHead";

const CreateAdminPage = () => {
  return (
    <>
      <SEOHead title="Create admin - MyTube" />
      <AdminDashboardLayout>
        <CreateAdmin />
      </AdminDashboardLayout>
    </>
  );
};

export default CreateAdminPage;
