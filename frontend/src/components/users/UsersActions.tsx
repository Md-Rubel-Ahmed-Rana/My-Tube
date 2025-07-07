import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { MoreVertical, Ban, Trash2 } from "lucide-react";
import { IUser, UserStatus } from "@/types/user.type";
import {
  useDeleteUserAccountMutation,
  useUpdateUserAccountStatusMutation,
} from "@/features/user";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  user: IUser;
};

const UsersActions = ({ user }: Props) => {
  const [deleteAccount, { isLoading }] = useDeleteUserAccountMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateUserAccountStatusMutation();

  const handleBlockToggle = async () => {
    const newStatus =
      user?.status === UserStatus.BANNED
        ? UserStatus.ACTIVE
        : UserStatus.BANNED;

    await handleApiMutation(
      updateStatus,
      {
        id: user?._id || user?.id,
        status: newStatus,
      },
      200
    );
  };

  const handleDelete = async () => {
    await handleApiMutation(deleteAccount, { id: user?._id || user?.id }, 200);
  };

  return (
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={isUpdating} onClick={handleBlockToggle}>
            <Ban className="mr-2 h-4 w-4" />
            {isUpdating
              ? "Updating..."
              : user?.status === UserStatus.BANNED
              ? "Unban User"
              : "Ban User"}
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isLoading} onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            {isLoading ? "Deleting..." : " Delete User"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
};

export default UsersActions;
