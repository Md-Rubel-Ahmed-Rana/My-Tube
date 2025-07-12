import SEOHead from "@/components/common/SEOHead";
import VideoThumbnail from "@/components/upload-video/VideoThumbnail";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { ReactElement } from "react";

const VideoMetadataPage = () => {
  return (
    <>
      <SEOHead title="Video Thumbnail | MyTube" />
      <VideoThumbnail />
    </>
  );
};

VideoMetadataPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(VideoMetadataPage);
