import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const GoogleSignInButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/dashboard/videos",
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
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
        disabled={loading}
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
