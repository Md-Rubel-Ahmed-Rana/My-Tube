import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import CreateCategory from "@/components/create-category";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const CreateCategoryPage = () => {
  return (
    <>
      <SEOHead title="Create category - MyTube" />
      <AdminDashboardLayout>
        <CreateCategory />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(CreateCategoryPage);
