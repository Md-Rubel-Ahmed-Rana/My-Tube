import SEOHead from "@/components/common/SEOHead";
import UploadVideo from "@/components/upload-video";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const UploadVideoPage = () => {
  return (
    <>
      <SEOHead title="Upload Video | MyTube" />
      <UploadVideo />
    </>
  );
};

export default UploadVideoPage;

UploadVideoPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
