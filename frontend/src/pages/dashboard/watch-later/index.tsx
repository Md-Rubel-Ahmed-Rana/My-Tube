import SEOHead from "@/components/common/SEOHead";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import WatchLaterVideos from "@/components/dashboard/watch-later";
import isAuthenticate from "@/middleware/ProtectRoute";

const WatchLaterVideosPage = () => {
  return (
    <>
      <SEOHead title="Watch later - MyTube" />
      <UserDashboardLayout>
        <WatchLaterVideos />
      </UserDashboardLayout>
    </>
  );
};

export default isAuthenticate(WatchLaterVideosPage);
