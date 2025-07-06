import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import VideosByChannel from "@/components/videos-by-channel";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const VideosPage = () => {
  return (
    <>
      <SEOHead title="Videos - MyTube" />
      <AdminDashboardLayout>
        <VideosByChannel />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(VideosPage);
