import { useEffect } from "react";

export const useBeforeUnload = (
  isBlocking: boolean,
  message = "Upload in progress. Please wait..."
) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isBlocking) {
        e.preventDefault();
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isBlocking, message]);
};
