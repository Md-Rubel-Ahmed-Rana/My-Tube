import SEOHead from "@/components/common/SEOHead";
import Register from "@/components/register";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const CreateAccount = () => {
  return (
    <>
      <SEOHead title="Create account | MyTube" />
      <Register />
    </>
  );
};

export default CreateAccount;

CreateAccount.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
