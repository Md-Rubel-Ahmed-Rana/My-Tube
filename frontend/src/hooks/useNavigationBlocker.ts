/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

export const useNavigationBlocker = (
  isBlocking: boolean,
  message = "Upload in progress. Please wait..."
) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (isBlocking) {
        toast.error(message);
        throw "Navigation blocked due to upload in progress.";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isBlocking, message]);
};
