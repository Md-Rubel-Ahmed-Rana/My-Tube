import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import VideosByStatus from "@/components/videos-by-status";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const VideosPage = () => {
  return (
    <>
      <SEOHead title="Videos - MyTube" />
      <AdminDashboardLayout>
        <VideosByStatus />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(VideosPage);
