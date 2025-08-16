import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import WatchLaterVideos from "@/components/watch-later-videos";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const WatchLaterVideosPage = () => {
  return (
    <>
      <SEOHead title="Watch later videos - MyTube" />
      <AdminDashboardLayout>
        <WatchLaterVideos />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(WatchLaterVideosPage);
