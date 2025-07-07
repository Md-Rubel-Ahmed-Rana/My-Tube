import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGetPlaylistDetailsAdminQuery } from "@/features/playlist";
import { IPlaylist } from "@/types/playlist.type";
import { useRouter } from "next/router";
import Image from "next/image";
import SelectPlaylist from "./SelectPlaylist";

const PlaylistDetails = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading, isFetching } = useGetPlaylistDetailsAdminQuery({
    id,
  });
  const playlist = data?.data as IPlaylist;

  if (isLoading || isFetching || !playlist) {
    return (
      <div className="grid gap-4 p-2 lg:p-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-3 p-2 lg:p-4">
      <SelectPlaylist shouldShowNoData={false} />
      {/* Playlist Info */}
      <Card className="bg-gray-100 dark:bg-gray-800 px-0">
        <CardHeader>
          <CardTitle className="text-2xl">{playlist.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-muted-foreground">Slug:</span>{" "}
            {playlist?.slug}
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Status:</span>{" "}
            <Badge className="capitalize">{playlist?.status}</Badge>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              Video Count:
            </span>{" "}
            {playlist?.videoCount}
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              Created At:
            </span>{" "}
            {new Date(playlist.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              Updated At:
            </span>{" "}
            {new Date(playlist.updatedAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium text-muted-foreground">User:</span>{" "}
            {playlist?.user?.name || "unknown"}
          </div>
        </CardContent>
      </Card>

      {/* Videos List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Videos in this Playlist</h2>
        {playlist?.videos?.length <= 0 ? (
          <p className="text-muted-foreground">
            No videos found for this playlist
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlist.videos.map((video) => (
              <Card className="bg-gray-100 dark:bg-gray-800 p-0" key={video.id}>
                <CardContent className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="rounded-t-xl object-cover"
                    />
                  </AspectRatio>
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-base">{video.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetails;
