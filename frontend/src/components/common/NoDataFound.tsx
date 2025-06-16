import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Frown } from "lucide-react";

interface NoDataFoundProps {
  message?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  message = "No data found.",
  icon,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center min-h-[300px] p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
        className
      )}
    >
      <div className="mb-4 text-muted-foreground">
        {icon || <Frown className="w-16 h-16" />}
      </div>
      <h1 className="text-muted-foreground text-2xl mb-1">{message}</h1>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default NoDataFound;
