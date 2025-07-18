import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { baseApi } from "@/features/api";
import { toast } from "sonner";

type Props = {
  isDisabled?: boolean;
};

const GoogleSignInButton = ({ isDisabled = false }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      window.open(`${baseApi}/auth/google`, "_self");
    } catch {
      toast.error("Google Sign-In Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-2">
      <div className="flex items-center gap-3 w-full">
        <span className="w-1/2">
          <Separator />
        </span>
        <b>OR</b>
        <span className="w-1/2">
          <Separator />
        </span>
      </div>
      <Button
        onClick={handleGoogleSignIn}
        disabled={loading || isDisabled}
        type="button"
        className="w-full flex items-center gap-2 bg-gray-200 dark:bg-gray-700"
      >
        {loading ? (
          "Signing in..."
        ) : (
          <>
            <Image
              src="/icons/google.svg"
              alt="Google logo"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Sign in with Google
          </>
        )}
      </Button>
    </div>
  );
};

export default GoogleSignInButton;
