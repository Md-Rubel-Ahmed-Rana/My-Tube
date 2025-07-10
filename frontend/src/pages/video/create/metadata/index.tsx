import SEOHead from "@/components/common/SEOHead";
import VideoMetadata from "@/components/upload-video/VideoMetadata";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const VideoMetadataPage = () => {
  return (
    <>
      <SEOHead title="Video Metadata | MyTube" />
      <VideoMetadata />
    </>
  );
};

VideoMetadataPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

// export default isAuthenticate(VideoMetadataPage);
export default VideoMetadataPage;
