import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import { CommentsAnalytics } from "@/components/admin-dashboard/analytics";
import SEOHead from "@/components/common/SEOHead";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const CommentsStatsPage = () => {
  return (
    <>
      <SEOHead title="Comments Stats - MyTube" />
      <AdminDashboardLayout>
        <div className="p-2 lg:p-4">
          <CommentsAnalytics />
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(CommentsStatsPage);
