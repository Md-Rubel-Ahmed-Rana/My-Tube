import SEOHead from "@/components/common/SEOHead";
import Login from "@/components/login";
import RootLayout from "@/layout/RootLayout";
import IsAlreadyAuthenticated from "@/middleware/IsAlreadyAuthenticated";
import { ReactElement } from "react";

const CreateAccount = () => {
  return (
    <>
      <SEOHead title="Login | MyTube" />
      <Login />
    </>
  );
};

CreateAccount.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default IsAlreadyAuthenticated(CreateAccount);
