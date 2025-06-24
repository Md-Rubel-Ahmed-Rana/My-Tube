import Channels from "@/components/dashboard/channels";
import SEOHead from "@/components/common/SEOHead";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { ReactElement } from "react";

const ChannelsPage = () => {
  return (
    <>
      <SEOHead title="Channels | MyTube" />
      <Channels />
    </>
  );
};

ChannelsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(ChannelsPage);
