import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import AllIndexedDocuments from "@/components/elastic-search/AllIndexedDocuments";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const AllIndexedDocumentsPage = () => {
  return (
    <>
      <SEOHead title="Elasticsearch documents - MyTube" />
      <AdminDashboardLayout>
        <AllIndexedDocuments />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(AllIndexedDocumentsPage);
