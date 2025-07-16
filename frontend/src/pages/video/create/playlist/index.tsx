import SEOHead from "@/components/common/SEOHead";
import VideoPlaylist from "@/components/upload-video/VideoPlaylist";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { ReactElement } from "react";

const VideoMetadataPage = () => {
  return (
    <>
      <SEOHead title="Playlist selection | MyTube" />
      <VideoPlaylist />
    </>
  );
};

VideoMetadataPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(VideoMetadataPage);
