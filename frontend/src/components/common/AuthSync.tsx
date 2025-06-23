import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useGetLoggedInUserQuery, userLogin } from "@/features/auth";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const { data: userData, isLoading: userLoading } = useGetLoggedInUserQuery(
    {}
  );
  const user = userData?.data;
  const loginAttempted = useRef(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.email &&
      !userLoading &&
      !user &&
      !loginAttempted.current
    ) {
      loginAttempted.current = true;
      userLogin({
        name: session.user.name!,
        email: session.user.email!,
        photo: session.user.image!,
      });
    }
  }, [status, session, user, userLoading]);

  return null;
}
