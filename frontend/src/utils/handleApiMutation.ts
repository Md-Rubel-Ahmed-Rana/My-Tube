/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRouter } from "next/router";
import { toast } from "sonner";

export const handleApiMutation = async <TPayload>(
  mutationTrigger: (payload: TPayload) => Promise<any>,
  payload: TPayload,
  successStatusCode: number,
  customMessages: {
    error?: string;
    success?: string;
  } = {},
  redirect: {
    isRedirect?: boolean;
    path?: string;
    router?: NextRouter;
  } = {}
) => {
  try {
    const res = await mutationTrigger(payload);
    if (res?.data?.statusCode === successStatusCode) {
      toast.success(
        res?.data?.message || customMessages.success || "Operation succeeded"
      );
      if (redirect?.isRedirect) {
        redirect?.router?.push(redirect?.path || "/");
      }
    } else {
      toast.error(
        res?.error?.data.message || customMessages.error || "Operation failed"
      );
    }
  } catch (err: any) {
    toast.error(
      err?.data?.message ||
        err?.error ||
        customMessages.error ||
        "Something went wrong"
    );
  }
};
