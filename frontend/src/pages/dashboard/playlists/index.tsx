import SEOHead from "@/components/common/SEOHead";
import Playlists from "@/components/dashboard/playlist";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";

const PlaylistsPage = () => {
  return (
    <>
      <SEOHead title="My Playlists | MyTube" />
      <UserDashboardLayout>
        <Playlists />
      </UserDashboardLayout>
    </>
  );
};
// export default isAuthenticate(PlaylistsPage);
export default PlaylistsPage;
