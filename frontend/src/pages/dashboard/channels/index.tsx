import Channels from "@/components/dashboard/channels";
import SEOHead from "@/components/common/SEOHead";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";

const ChannelsPage = () => {
  return (
    <>
      <SEOHead title="Channels | MyTube" />
      <UserDashboardLayout>
        <Channels />
      </UserDashboardLayout>
    </>
  );
};

// export default isAuthenticate(ChannelsPage);
export default ChannelsPage;
