import SEOHead from "@/components/common/SEOHead";
import Dashboard from "@/components/dashboard/videos";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { ReactElement } from "react";

const DashboardPage = () => {
  return (
    <>
      <SEOHead title="My Videos | MyTube" />
      <Dashboard />
    </>
  );
};

DashboardPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(DashboardPage);
