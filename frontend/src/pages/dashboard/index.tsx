import SEOHead from "@/components/common/SEOHead";
import Dashboard from "@/components/dashboard";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const DashboardPage = () => {
  return (
    <>
      <SEOHead title="Dashboard | My Videos | MyTube" />
      <Dashboard />
    </>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
