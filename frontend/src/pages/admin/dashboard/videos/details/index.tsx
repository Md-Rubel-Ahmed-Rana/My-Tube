import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import VideoSelect from "@/components/video-details";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const VideosPage = () => {
  return (
    <>
      <SEOHead title="Videos - MyTube" />
      <AdminDashboardLayout>
        <VideoSelect shouldShowNoData={true} />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(VideosPage);
