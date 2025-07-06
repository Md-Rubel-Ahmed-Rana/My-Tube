import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import Playlists from "@/components/playlists";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const PlaylistsPage = () => {
  return (
    <>
      <SEOHead title="Playlists - MyTube" />
      <AdminDashboardLayout>
        <Playlists />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(PlaylistsPage);
