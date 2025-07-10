import SEOHead from "@/components/common/SEOHead";
import VideoUploader from "@/components/upload-video/VideoUploader";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const VideoMetadataPage = () => {
  return (
    <>
      <SEOHead title="Video Upload | MyTube" />
      <VideoUploader />
    </>
  );
};

VideoMetadataPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

// export default isAuthenticate(VideoMetadataPage);
export default VideoMetadataPage;
