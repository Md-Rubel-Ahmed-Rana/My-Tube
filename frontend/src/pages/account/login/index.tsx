import SEOHead from "@/components/common/SEOHead";
import Login from "@/components/login";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const CreateAccount = () => {
  return (
    <>
      <SEOHead title="Login | MyTube" />
      <Login />
    </>
  );
};

export default CreateAccount;

CreateAccount.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
