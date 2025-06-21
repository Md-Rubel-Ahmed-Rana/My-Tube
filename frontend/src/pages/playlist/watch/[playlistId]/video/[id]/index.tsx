import SEOHead from "@/components/common/SEOHead";
import PlayListVideos from "@/components/playlist-videos";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const PlaylistVideoPage = () => {
  const { query } = useRouter();
  const title = (query?.title || "unknown") as string;
  return (
    <>
      <SEOHead title={`${title}`} />
      <PlayListVideos />
    </>
  );
};

PlaylistVideoPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(PlaylistVideoPage);
