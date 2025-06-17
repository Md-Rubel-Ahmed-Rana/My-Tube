import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";

const Profile = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  if (isLoading || !user)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-2xl  mx-auto mt-10 px-4">
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader className="flex flex-col items-center text-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.photo} className="ring-1" alt={user.name} />
            <AvatarFallback className="border bg-gray-300 dark:bg-gray-700">
              {formatNameForImageFallback(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              @{user?.username || "unknown username"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 text-sm sm:text-base">
          <div className="space-y-1">
            <Label className="text-muted-foreground">
              Email (unchangeable)
            </Label>
            <p>{user.email}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">
              Username (unchangeable)
            </Label>
            <p>{user?.username || "unknown username"}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Joined At</Label>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Last Updated</Label>
            <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
