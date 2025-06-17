import { useEffect } from "react";
import { useRouter } from "next/router";

export const useClearSearchOnRouteChange = (clearSearch: () => void) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const path = url.split("?")[0];
      if (path === "/results") return;

      clearSearch();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [clearSearch, router.events]);
};
