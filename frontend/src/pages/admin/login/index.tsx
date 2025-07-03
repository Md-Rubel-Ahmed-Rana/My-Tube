import AdminLogin from "@/components/admin-login";
import SEOHead from "@/components/common/SEOHead";
import RootLayout from "@/layout/RootLayout";
import IsAlreadyAuthenticated from "@/middleware/IsAlreadyAuthenticated";
import { ReactElement } from "react";

const AdminAccountLogin = () => {
  return (
    <>
      <SEOHead title="Admin login | MyTube" />
      <AdminLogin />
    </>
  );
};

AdminAccountLogin.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default IsAlreadyAuthenticated(AdminAccountLogin);
