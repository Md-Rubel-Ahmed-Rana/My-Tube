import Head from "next/head";

type SEOHeadProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const SEOHead = ({
  title = "MyTube - Watch, Upload & Share Videos",
  description = "MyTube is a modern video streaming platform where you can watch, upload, and share videos with the world. Discover trending content, connect with creators, and enjoy a seamless streaming experience, just like YouTube. Built with the latest web technologies for speed, performance, and responsiveness.",
  children,
}: SEOHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytube.example.com" />
      <meta
        property="og:image"
        content="https://mytube.example.com/og-image.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://mytube.example.com/og-image.jpg"
      />
      <meta name="twitter:site" content="@mytube" />

      <meta
        name="keywords"
        content="video streaming, upload videos, share videos, watch videos, video platform, youtube clone, mytube, modern video app, react video player"
      />
      <meta name="author" content="MyTube Team" />
      <meta name="robots" content="index, follow" />

      {children}
    </Head>
  );
};

export default SEOHead;
