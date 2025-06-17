import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";
import { Camera, Pencil } from "lucide-react";
import { useState } from "react";
import NameUpdateForm from "./NameUpdateForm";

const Profile = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [isNameChange, setIsNameChange] = useState(false);

  return (
    <div className="max-w-2xl  mx-auto mt-5 px-2 lg:px-4">
      <Card className="bg-gray-100 dark:bg-gray-800 p-2 lg:p-4">
        <CardHeader className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 ">
              {isLoading ? (
                <Skeleton className="w-24 h-24 border rounded-full bg-gray-300 dark:bg-gray-700" />
              ) : (
                <>
                  <AvatarImage
                    src={user?.photo}
                    className="ring-1"
                    alt={user.name}
                  />
                  <AvatarFallback className="border bg-gray-300 dark:bg-gray-700">
                    {formatNameForImageFallback(user.name)}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <Camera className="absolute top-0 right-0 cursor-pointer" />
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <Skeleton className="w-full lg:w-1/2 h-4 bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="w-3/4 lg:w-1/3 h-4 bg-gray-300 dark:bg-gray-700" />
              </div>
            ) : (
              <>
                {isNameChange ? (
                  <NameUpdateForm
                    id={user?.id}
                    name={user?.name}
                    setOpen={setIsNameChange}
                    username={user?.username}
                  />
                ) : (
                  <>
                    <div className="flex items-center gap-2 justify-center">
                      <CardTitle className="text-lg lg:text-2xl">
                        {user?.name}
                      </CardTitle>
                      <Pencil
                        size={16}
                        onClick={() => setIsNameChange(true)}
                        className="cursor-pointer"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      @{user?.username || "unknown username"}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 text-sm sm:text-base">
          <div className="space-y-1">
            <Label className="text-muted-foreground">
              Email (unchangeable)
            </Label>
            {isLoading ? (
              <Skeleton className="w-full lg:w-1/2 h-3 mt-2 bg-gray-300 dark:bg-gray-700" />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">
              Username (unchangeable)
            </Label>
            {isLoading ? (
              <Skeleton className="w-full lg:w-1/2 h-3 mt-2 bg-gray-300 dark:bg-gray-700" />
            ) : (
              <p>{user?.username || "unknown username"}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Joined At</Label>
            {isLoading ? (
              <Skeleton className="w-full lg:w-1/2 h-3 mt-2 bg-gray-300 dark:bg-gray-700" />
            ) : (
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Last Updated</Label>
            {isLoading ? (
              <Skeleton className="w-full lg:w-1/2 h-3 mt-2 bg-gray-300 dark:bg-gray-700" />
            ) : (
              <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
