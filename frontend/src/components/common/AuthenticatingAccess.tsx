import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const AuthenticatingAccess = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-[70vh] w-full",
        "bg-gray-100 dark:bg-gray-800 text-foreground"
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-lg font-medium">Authenticating access…</p>
        <p className="text-sm text-muted-foreground">
          Please wait while we verify your session.
        </p>
      </div>
    </div>
  );
};

export default AuthenticatingAccess;
