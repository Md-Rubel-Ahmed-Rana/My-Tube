import SEOHead from "@/components/common/SEOHead";
import UploadVideo from "@/components/upload-video";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { ReactElement } from "react";

const UploadVideoPage = () => {
  return (
    <>
      <SEOHead title="Upload Video | MyTube" />
      <UploadVideo />
    </>
  );
};

UploadVideoPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(UploadVideoPage);
