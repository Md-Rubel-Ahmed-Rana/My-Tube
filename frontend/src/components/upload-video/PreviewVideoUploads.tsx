/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetLocalStorageData from "@/hooks/useGetLocalStorageData";
import useGetUploadedVideo from "@/hooks/useGetUploadedVideo";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/router";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useGetPlaylistsByOwnerQuery } from "@/features/playlist";
import { useJoinRoom } from "@/hooks/useJoinRoom";

type Props = {
  setIsPreviewMode: (value: boolean) => void;
  handleUploadVideo: any;
};

const PreviewVideoUploads = ({
  setIsPreviewMode,
  handleUploadVideo,
}: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  // join user to socket room
  useJoinRoom(user?.id || user?._id);
  const { data } = useGetPlaylistsByOwnerQuery({
    userId: user?.id || "",
  });

  const playlists = data?.data || [];
  const { title, category, description, playlistId, tags, thumbnail } =
    useGetLocalStorageData();
  const { video } = useGetUploadedVideo();
  const router = useRouter();
  const playlist = playlists.find((plst) => plst?.id === playlistId);

  const handleRedirectEdit = (
    path:
      | "/video/create/metadata"
      | "/video/create/playlist"
      | "/video/create/thumbnail"
  ) => {
    router.push(path);
  };

  return (
    <div className="p-2 lg:p-4">
      <div className="flex items-center justify-end pb-2">
        <Button
          onClick={handleUploadVideo}
          type="button"
          className="bg-blue-600 text-white hover:bg-blue-700"
          variant="default"
        >
          Upload Now
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          <Card className="bg-gray-200 dark:bg-gray-800 px-0 py-4">
            <CardHeader className="px-2 py-0">
              <CardTitle>
                <div className="flex justify-between items-center">
                  <h4>Video Preview</h4>
                  <Button
                    onClick={() => setIsPreviewMode(false)}
                    size={"sm"}
                    type="button"
                    variant="default"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
              {video ? (
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  className="w-full rounded-lg shadow h-52"
                />
              ) : (
                <p className="text-muted-foreground text-center">
                  No video uploaded
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-200 dark:bg-gray-800 px-0 py-4">
            <CardHeader className="px-2 py-0">
              <CardTitle>
                <div className="flex justify-between items-center">
                  <h4> Thumbnail Preview</h4>
                  <Button
                    onClick={() =>
                      handleRedirectEdit("/video/create/thumbnail")
                    }
                    size={"sm"}
                    type="button"
                    variant="default"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
              {thumbnail ? (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail"
                  className="w-full rounded-lg shadow object-cover h-52"
                />
              ) : (
                <p className="text-muted-foreground text-center">
                  No thumbnail uploaded
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="flex-1 space-y-4">
          <Card className="bg-gray-200 dark:bg-gray-800 px-0 py-4">
            <CardHeader className="px-2 py-0">
              <CardTitle>
                <div className="flex justify-between items-center">
                  <h4>Video Metadata</h4>
                  <Button
                    onClick={() => handleRedirectEdit("/video/create/metadata")}
                    size={"sm"}
                    type="button"
                    variant="default"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 py-1">
              <div>
                <h4 className="text-sm text-muted-foreground">Title</h4>
                <p className="font-medium">{title || "—"}</p>
              </div>

              <div>
                <h4 className="text-sm text-muted-foreground">Category</h4>
                <p className="font-medium">{category || "—"}</p>
              </div>

              <div>
                <h4 className="text-sm  flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Playlist
                  </span>
                  <Pencil
                    onClick={() => handleRedirectEdit("/video/create/playlist")}
                    className="w-4 h-4 cursor-pointer"
                  />
                </h4>
                <p className="font-medium">{playlist?.name || "No selected"}</p>
              </div>

              <div>
                <h4 className="text-sm text-muted-foreground">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tags?.length ? (
                    tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)
                  ) : (
                    <p className="text-muted-foreground">No tags</p>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm text-muted-foreground">Description</h4>
                <ScrollArea className="h-80  ">
                  <div
                    className="prose max-w-none border border-gray-300 dark:border-gray-600  rounded  p-2 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: description || "<p>No description provided</p>",
                    }}
                  />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PreviewVideoUploads;
