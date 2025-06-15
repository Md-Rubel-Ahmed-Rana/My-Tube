/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const handleApiMutation = async <TPayload>(
  mutationTrigger: (payload: TPayload) => Promise<any>,
  payload: TPayload,
  successStatusCode: number,
  customMessages: {
    error?: string;
    success?: string;
  } = {}
) => {
  try {
    const res = await mutationTrigger(payload);
    console.log(res);
    if (res?.data?.statusCode === successStatusCode) {
      toast.success(
        res?.data?.message || customMessages.success || "Operation succeeded"
      );
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
