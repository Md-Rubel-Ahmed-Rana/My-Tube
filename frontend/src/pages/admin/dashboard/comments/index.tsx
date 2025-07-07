import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import CommentsByAdmin from "@/components/comments-admin";
import SEOHead from "@/components/common/SEOHead";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const CommentsStatsPage = () => {
  return (
    <>
      <SEOHead title="Comments - MyTube" />
      <AdminDashboardLayout>
        <CommentsByAdmin />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(CommentsStatsPage);
