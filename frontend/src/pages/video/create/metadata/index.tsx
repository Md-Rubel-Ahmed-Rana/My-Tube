import SEOHead from "@/components/common/SEOHead";
import VideoMetadata from "@/components/upload-video/VideoMetadata";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { ReactElement } from "react";

const VideoMetadataPage = () => {
  return (
    <>
      <SEOHead title="Video Metadata | MyTube" />
      <div className="p-2 lg:p-4">
        <VideoMetadata />
      </div>
    </>
  );
};

VideoMetadataPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(VideoMetadataPage);
