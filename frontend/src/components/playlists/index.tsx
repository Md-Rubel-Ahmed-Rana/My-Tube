// components/admin/playlist/AdminPlaylists.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetPlaylistsByAdminQuery } from "@/features/playlist";
import { IPlaylist, PlaylistStatus } from "@/types/playlist.type";
import PlaylistActions from "./PlaylistActions";
import Link from "next/link";

const statusColorMap: Record<PlaylistStatus, string> = {
  [PlaylistStatus.PUBLIC]: "bg-green-100 text-green-700",
  [PlaylistStatus.PRIVATE]: "bg-gray-100 text-gray-700",
  [PlaylistStatus.BLOCKED]: "bg-red-100 text-red-700",
  [PlaylistStatus.DELETED]: "bg-muted text-muted-foreground",
};

const AdminPlaylists = () => {
  const { data, isLoading } = useGetPlaylistsByAdminQuery({});
  const playlists = (data?.data || []) as IPlaylist[];

  return (
    <Card className="bg-gray-100 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Total Playlists: {playlists?.length || 0}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800 dark:text-gray-200">
                  Name
                </TableHead>
                <TableHead className="text-gray-800 dark:text-gray-200">
                  Status
                </TableHead>
                <TableHead className="text-gray-800 dark:text-gray-200">
                  Videos
                </TableHead>
                <TableHead className="text-gray-800 dark:text-gray-200">
                  Owner
                </TableHead>
                <TableHead className="text-right text-gray-800 dark:text-gray-200">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <TableCell key={index}>
                          <Skeleton className="h-4 bg-gray-300 dark:bg-gray-700 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                playlists.map((playlist) => (
                  <TableRow key={playlist?.id}>
                    <TableCell>{playlist?.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-md font-medium ${
                          statusColorMap[playlist?.status as PlaylistStatus]
                        }`}
                      >
                        {playlist?.status}
                      </span>
                    </TableCell>
                    <TableCell>{playlist?.videoCount}</TableCell>
                    <TableCell>{playlist?.user?.name}</TableCell>
                    <TableCell className="text-right flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/dashboard/playlists/details/${playlist?.id}?name=${playlist?.name}`}
                      >
                        <Button size={"xs"}>Details</Button>
                      </Link>
                      <PlaylistActions status={playlist?.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPlaylists;
