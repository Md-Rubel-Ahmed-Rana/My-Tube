/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleApiMutation } from "@/utils/handleApiMutation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { passwordChangeSchema } from "@/schemas/password-change.schema";
import { useRouter } from "next/router";

type Props = {
  id: string;
  reduxMutation: any;
  isUpdating: boolean;
  setOpen: (value: boolean) => void;
  open: boolean;
  redirectTo: "/account/login" | "/admin/login";
};

type FormData = z.infer<typeof passwordChangeSchema>;

const ChangePasswordModal = ({
  id,
  setOpen,
  open,
  reduxMutation,
  isUpdating,
  redirectTo,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(passwordChangeSchema),
  });
  const router = useRouter();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data: FormData) => {
    await handleApiMutation(
      reduxMutation,
      { id, oldPassword: data.oldPassword, newPassword: data.newPassword },
      200,
      {
        success: "Your password has been updated successfully",
        error: "Failed to update password",
      },
      { isRedirect: true, path: redirectTo, router }
    );
    reset();
    setOpen(false);
  };

  const renderPasswordInput = (
    label: string,
    field: keyof FormData,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => (
    <div className="relative max-w-sm">
      <Input
        type={show ? "text" : "password"}
        placeholder={label}
        {...register(field)}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-2 top-2.5 cursor-pointer text-gray-500 dark:text-gray-300"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]?.message}</p>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {renderPasswordInput(
            "Old Password",
            "oldPassword",
            showOld,
            setShowOld
          )}
          {renderPasswordInput(
            "New Password",
            "newPassword",
            showNew,
            setShowNew
          )}
          {renderPasswordInput(
            "Confirm New Password",
            "confirmPassword",
            showConfirm,
            setShowConfirm
          )}

          <DialogFooter className="flex justify-between w-full mt-4">
            <DialogClose asChild>
              <Button type="button" disabled={isUpdating}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="secondary"
              disabled={isUpdating}
              className="bg-gray-300 dark:bg-gray-800"
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
