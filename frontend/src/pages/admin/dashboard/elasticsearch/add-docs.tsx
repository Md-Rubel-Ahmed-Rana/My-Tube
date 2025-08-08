import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import AddFullDocs from "@/components/elastic-search/AddFullDocs";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const AddFullDocsPage = () => {
  return (
    <>
      <SEOHead title="Add documents - MyTube" />
      <AdminDashboardLayout>
        <AddFullDocs />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(AddFullDocsPage);
