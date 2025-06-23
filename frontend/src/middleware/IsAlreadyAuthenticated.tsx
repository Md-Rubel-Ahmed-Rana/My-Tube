/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthenticatingAccess from "@/components/common/AuthenticatingAccess";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import { LockIcon } from "lucide-react";
import { useEffect } from "react";

const IsAlreadyAuthenticated = (WrappedComponent: any) => {
  const ComponentWithGuestGuard = (props: any) => {
    const router = useRouter();
    const { data, isLoading }: any = useGetLoggedInUserQuery({});
    const user: IUser = data?.data;

    useEffect(() => {
      if (!isLoading && user) {
        router.push("/dashboard/videos");
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return <AuthenticatingAccess />;
    }

    if (user?.id) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100 dark:bg-gray-800 text-foreground px-4">
          <LockIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl text-gray-800 dark:text-gray-200 lg:text-4xl font-semibold mb-2">
            Already Signed In
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground max-w-md text-center">
            You&apos;re already logged in. Please log out first if you want to
            access the login or registration page.
          </p>
        </div>
      );
    }

    return !user ? <WrappedComponent {...props} /> : null;
  };

  if (WrappedComponent.getLayout) {
    ComponentWithGuestGuard.getLayout = WrappedComponent.getLayout;
  }

  return ComponentWithGuestGuard;
};

export default IsAlreadyAuthenticated;
