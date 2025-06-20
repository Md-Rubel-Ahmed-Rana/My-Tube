/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthenticatingAccess from "@/components/common/AuthenticatingAccess";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import { LockIcon } from "lucide-react";
import { useEffect } from "react";

const isAuthenticate = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { data, isLoading, error }: any = useGetLoggedInUserQuery({});
    const user: IUser = data?.data;

    useEffect(() => {
      if (!isLoading && !user) {
        router.push(`/account/login?source=${router.asPath}`);
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return <AuthenticatingAccess />;
    }

    if (error || !user?.id) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100 dark:bg-gray-800 text-foreground px-4">
          <LockIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl lg:text-4xl font-semibold mb-2">
            Access Denied
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground max-w-md text-center">
            You must be signed in to view this page. Please log in to continue.
          </p>
        </div>
      );
    }

    return user ? <WrappedComponent {...props} /> : null;
  };

  if (WrappedComponent.getLayout) {
    ComponentWithAuth.getLayout = WrappedComponent.getLayout;
  }

  return ComponentWithAuth;
};

export default isAuthenticate;
