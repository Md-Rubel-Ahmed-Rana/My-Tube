import SEOHead from "@/components/common/SEOHead";
import Profile from "@/components/profile";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ProfilePage = () => {
  const { query } = useRouter();
  const name = query?.name as string;
  return (
    <>
      <SEOHead title={`Profile - ${name || "unknown"}`} />
      <Profile />
    </>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(ProfilePage);
