import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertText?: string;
};

const NotLoggedInDialog = ({ open, onOpenChange, alertText }: Props) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <TriangleAlert className="text-red-500 w-5 h-5" />
            <DialogTitle>Access Restricted</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            {alertText ||
              "You must be logged in to access this feature. Please log in to continue."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Link href={`/account/login?source=${router.asPath}`} passHref>
            <Button className="bg-gray-200 dark:bg-gray-600" size="sm">
              Login to Your Account
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotLoggedInDialog;
