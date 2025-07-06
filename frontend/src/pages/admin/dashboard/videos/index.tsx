import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import AdminVideos from "@/components/videos";

const VideosPage = () => {
  return (
    <>
      <SEOHead title="Videos - MyTube" />
      <AdminDashboardLayout>
        <AdminVideos />
      </AdminDashboardLayout>
    </>
  );
};

export default VideosPage;
