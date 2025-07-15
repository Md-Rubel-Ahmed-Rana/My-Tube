import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import UsedCategories from "@/components/used-categories";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const UsedCategoriesPage = () => {
  return (
    <>
      <SEOHead title="Used in videos | categories - MyTube" />
      <AdminDashboardLayout>
        <UsedCategories />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(UsedCategoriesPage);
