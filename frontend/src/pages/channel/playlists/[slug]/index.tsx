import ChannelPlaylists from "@/components/channel-playlists";
import SEOHead from "@/components/common/SEOHead";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ChannelVideosPage = () => {
  const { query } = useRouter();
  const name = query?.name as string;

  return (
    <>
      <SEOHead title={`Playlists - ${name || "Unknown"}`} />
      <ChannelPlaylists />
    </>
  );
};

export default ChannelVideosPage;

ChannelVideosPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
