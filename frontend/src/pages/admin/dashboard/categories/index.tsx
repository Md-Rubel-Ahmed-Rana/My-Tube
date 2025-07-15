import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import Categories from "@/components/categories";
import SEOHead from "@/components/common/SEOHead";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const CategoriesPage = () => {
  return (
    <>
      <SEOHead title="Categories - MyTube" />
      <AdminDashboardLayout>
        <Categories />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(CategoriesPage);
