import SEOHead from "@/components/common/SEOHead";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import MyVideos from "@/components/dashboard/videos/MyVideos";
import isAuthenticate from "@/middleware/ProtectRoute";

const DashboardPage = () => {
  return (
    <>
      <SEOHead title="Dashboard" />
      <UserDashboardLayout>
        <MyVideos />
      </UserDashboardLayout>
    </>
  );
};

export default isAuthenticate(DashboardPage);
