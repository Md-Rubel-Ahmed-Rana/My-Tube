import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import PlaylistDetails from "@/components/playlists/PlaylistDetails";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";
import { useRouter } from "next/router";

const PlaylistsPage = () => {
  const { query } = useRouter();
  const name = query?.name as string;
  return (
    <>
      <SEOHead title={name || "MyTube"} />
      <AdminDashboardLayout>
        <PlaylistDetails />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(PlaylistsPage);
