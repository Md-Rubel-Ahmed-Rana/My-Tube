import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IUser, UserStatus } from "@/types/user.type";
import { useGetAllUserByAdminQuery } from "@/features/user";

import UserSearchFilters from "./UserSearchFilters";
import UserTable from "./UserTable";
import { useState } from "react";

const UsersList = () => {
  const [queryArgs, setQueryArgs] = useState<{
    searchQuery?: string;
    status?: UserStatus;
  }>({});

  const { data, isLoading } = useGetAllUserByAdminQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  console.log(queryArgs);

  const users = (data?.data || []) as IUser[];

  return (
    <Card className="bg-gray-100 dark:bg-gray-800 py-2 border-0">
      <CardHeader>
        <UserSearchFilters refetch={setQueryArgs} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"
              />
            ))}
          </div>
        ) : (
          <UserTable users={users} />
        )}
      </CardContent>
    </Card>
  );
};

export default UsersList;
