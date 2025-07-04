/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthenticatingAccess from "@/components/common/AuthenticatingAccess";
import { useRouter } from "next/router";
import { LockIcon } from "lucide-react";
import { useEffect } from "react";
import SEOHead from "@/components/common/SEOHead";
import { useGetLoggedInAdminQuery } from "@/features/admin";
import { IAdmin } from "@/types/admin.type";

const AdminAuthGuard = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { data, isLoading, error }: any = useGetLoggedInAdminQuery({});
    const admin = data?.data as IAdmin;

    useEffect(() => {
      if (!isLoading && !admin) {
        router.push(`/admin/login?source=${router.asPath}`);
      }
    }, [isLoading, admin, router]);

    if (isLoading) {
      return <AuthenticatingAccess />;
    }

    if (error || !admin?.email) {
      return (
        <>
          <SEOHead title="Access Denied" />
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 text-foreground px-4">
            <LockIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl text-gray-800 dark:text-gray-200 lg:text-4xl font-semibold mb-2">
              Access Denied
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground max-w-md text-center">
              You must be signed in as admin to view this page. Please log in to
              continue.
            </p>
          </div>
        </>
      );
    }

    return admin ? <WrappedComponent {...props} /> : null;
  };

  if (WrappedComponent.getLayout) {
    ComponentWithAuth.getLayout = WrappedComponent.getLayout;
  }

  return ComponentWithAuth;
};

export default AdminAuthGuard;
