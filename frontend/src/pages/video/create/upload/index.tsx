import SEOHead from "@/components/common/SEOHead";
import UploadVideo from "@/components/upload-video/UploadVideo";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const VideoMetadataPage = () => {
  return (
    <>
      <SEOHead title="Video Upload | MyTube" />
      <UploadVideo />
    </>
  );
};

VideoMetadataPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

// export default isAuthenticate(VideoMetadataPage);
export default VideoMetadataPage;
