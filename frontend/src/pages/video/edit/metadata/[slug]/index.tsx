import SEOHead from "@/components/common/SEOHead";
import VideoMetadataUpdate from "@/components/video-metadata-edit";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const VideoEditPage = () => {
  const { query } = useRouter();
  const title = (query?.title || "unknown") as string;
  return (
    <>
      <SEOHead title={`Edit video - ${title}`} />
      <VideoMetadataUpdate />
    </>
  );
};

VideoEditPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(VideoEditPage);
