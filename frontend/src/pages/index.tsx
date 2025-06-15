import SEOHead from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

export default function HomePage() {
  return (
    <>
      <SEOHead />
      <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl font-semibold">Welcome to My Tube</h1>
        <Button>Click Me</Button>
      </div>
    </>
  );
}

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
