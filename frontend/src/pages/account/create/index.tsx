import SEOHead from "@/components/common/SEOHead";
import Register from "@/components/register";
import RootLayout from "@/layout/RootLayout";
import IsAlreadyAuthenticated from "@/middleware/IsAlreadyAuthenticated";
import { ReactElement } from "react";

const CreateAccount = () => {
  return (
    <>
      <SEOHead title="Create account | MyTube" />
      <Register />
    </>
  );
};

CreateAccount.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default IsAlreadyAuthenticated(CreateAccount);
