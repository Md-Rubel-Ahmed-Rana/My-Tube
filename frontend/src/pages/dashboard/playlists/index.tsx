import SEOHead from "@/components/common/SEOHead";
import Playlists from "@/components/dashboard/playlist";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middleware/ProtectRoute";
import { ReactElement } from "react";

const PlaylistsPage = () => {
  return (
    <>
      <SEOHead title="My Playlists | MyTube" />
      <Playlists />
    </>
  );
};

PlaylistsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(PlaylistsPage);
