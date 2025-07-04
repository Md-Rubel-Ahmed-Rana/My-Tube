import SEOHead from "@/components/common/SEOHead";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import MyVideos from "@/components/dashboard/videos/MyVideos";

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

// export default isAuthenticate(DashboardPage);
export default DashboardPage;
