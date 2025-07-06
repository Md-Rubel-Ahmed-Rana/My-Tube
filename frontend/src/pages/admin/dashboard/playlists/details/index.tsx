import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import SelectPlaylist from "@/components/playlists/SelectPlaylist";

const PlaylistSelectPage = () => {
  return (
    <>
      <SEOHead title={"Playlist select - MyTube"} />
      <AdminDashboardLayout>
        <SelectPlaylist shouldShowNoData={true} />
      </AdminDashboardLayout>
    </>
  );
};

export default PlaylistSelectPage;
