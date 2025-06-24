import SEOHead from "@/components/common/SEOHead";
import Video from "@/components/video";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const VideoPage = () => {
  const { query } = useRouter();
  const title = (query?.title || "unknown") as string;
  const description = (query?.description || "unknown") as string;
  return (
    <>
      <SEOHead title={title} description={description} />
      <Video />
    </>
  );
};

export default VideoPage;

VideoPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
