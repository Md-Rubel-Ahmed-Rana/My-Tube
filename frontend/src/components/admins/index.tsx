import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllAdminsQuery } from "@/features/admin";
import { IAdmin } from "@/types/admin.type";

const Admins = () => {
  const { data, isLoading } = useGetAllAdminsQuery({});
  const admins: IAdmin[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <Card className="w-full bg-gray-100 dark:bg-gray-800 rounded-sm p-0">
      <CardHeader className="py-0">
        <CardTitle className="text-xl font-bold">Manage admins</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden p-0">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div className="flex items-center space-x-4" key={i}>
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[40%]" />
                  <Skeleton className="h-4 w-[30%]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-2 px-4">Photo</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4 text-right">Joined</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr
                    key={admin?._id || index}
                    className="border-b hover:bg-muted/30"
                  >
                    <td className="py-2 px-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={admin?.photo || ""} />
                        <AvatarFallback>
                          {admin?.name
                            ? admin?.name.charAt(0).toUpperCase()
                            : "N/A"}
                        </AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="py-2 px-4 font-medium">
                      {admin?.name || ""}
                    </td>
                    <td className="py-2 px-4">{admin?.email || ""}</td>
                    <td className="py-2 px-4">
                      <Badge variant="secondary">{admin?.role || ""}</Badge>
                    </td>
                    <td className="py-2 px-4 text-right">
                      {admin?.createdAt
                        ? new Date(admin?.createdAt).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default Admins;
