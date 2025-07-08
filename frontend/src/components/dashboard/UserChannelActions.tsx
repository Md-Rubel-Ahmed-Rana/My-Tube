import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../common/LogoutButton";
import { EllipsisVertical } from "lucide-react";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import NameUpdateForm from "./NameUpdateForm";
import UpdateProfileImageModal from "./UpdateProfileImageModal";

import ChangePasswordModal from "../common/ChangePasswordModal";
import { useUpdateUserPasswordMutation } from "@/features/user";

type Props = {
  user: IUser;
  isPhotoChange: boolean;
  setIsPhotoChange: (value: boolean) => void;
};

const UserChannelActions = ({
  user,
  isPhotoChange,
  setIsPhotoChange,
}: Props) => {
  const [isNameUpdate, setIsNameUpdate] = useState(false);

  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [changePassword, { isLoading: isUpdating }] =
    useUpdateUserPasswordMutation();
  return (
    <>
      <div className="flex gap-2 flex-wrap mt-2   sm:mt-0">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="border bg-gray-300 dark:bg-gray-700"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsNameUpdate(true)}
            >
              Change name
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsPhotoChange(true)}
            >
              Change profile image
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsUpdatePassword(true)}
            >
              Change password
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isNameUpdate && (
        <NameUpdateForm
          id={user?.id}
          name={user?.name}
          setOpen={setIsNameUpdate}
          open={isNameUpdate}
        />
      )}
      {isPhotoChange && (
        <UpdateProfileImageModal
          id={user?.id}
          open={isPhotoChange}
          setOpen={setIsPhotoChange}
        />
      )}
      {isUpdatePassword && (
        <ChangePasswordModal
          id={user?.id || user?._id}
          isUpdating={isUpdating}
          reduxMutation={changePassword}
          open={isUpdatePassword}
          setOpen={setIsUpdatePassword}
          redirectTo="/account/login"
        />
      )}
    </>
  );
};

export default UserChannelActions;
