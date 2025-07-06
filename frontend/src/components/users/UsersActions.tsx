import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { MoreVertical, Ban, Trash2, Lock, User } from "lucide-react";
import { IUser, UserStatus } from "@/types/user.type";
import { toast } from "sonner";

type Props = {
  user: IUser;
};

const UsersActions = ({ user }: Props) => {
  const handleBlockToggle = (id: string, status: UserStatus) => {
    const newStatus =
      status === UserStatus.BANNED ? UserStatus.ACTIVE : UserStatus.BANNED;
    toast.info(`Toggle block status to ${newStatus} for user`);
    toast.info("Feature is coming soon...");
  };

  const handleDelete = (id: string) => {
    toast.info(`Delete user with id: ${id}`);
    toast.info("Feature is coming soon...");
  };

  const handleChangePassword = (id: string) => {
    toast.info(`Change password for user: ${id}`);
    toast.info("Feature is coming soon...");
  };

  const handleChangeUsername = (id: string) => {
    toast.info(`Change username for user: ${id}`);
    toast.info("Feature is coming soon...");
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
          <DropdownMenuItem
            onClick={() =>
              handleBlockToggle(user?._id, user?.status as UserStatus)
            }
          >
            <Ban className="mr-2 h-4 w-4" />
            {user?.status === UserStatus.BANNED ? "Unban User" : "Ban User"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(user?._id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChangePassword(user?._id)}>
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChangeUsername(user?._id)}>
            <User className="mr-2 h-4 w-4" />
            Change Username
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
};

export default UsersActions;
