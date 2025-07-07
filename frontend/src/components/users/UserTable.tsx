import { IUser } from "@/types/user.type";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UsersActions from "./UsersActions";
import NoDataFound from "../common/NoDataFound";

type Props = {
  users: IUser[];
};

const UserTable = ({ users = [] }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-800 dark:text-gray-200">
            User
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            Username
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            Email
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            Joined
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            Status
          </TableHead>
          <TableHead className="text-right text-gray-800 dark:text-gray-200">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.length <= 0 ? (
          <NoDataFound message="No user found">
            <p>We did not found user with your query</p>
          </NoDataFound>
        ) : (
          <>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.photo} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>@{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
                <UsersActions user={user} />
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
