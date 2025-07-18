/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPlaylist } from "@/types/playlist.type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Skeleton } from "@/components/ui/skeleton";
import { IVideo } from "@/types/video.type";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";
import RelatedVideoLoadingSkeleton from "@/skeletons/RelatedVideoLoading.skeleton";
import PlaylistHeader from "./PlaylistHeader";
import { useReorderPlaylistVideosMutation } from "@/features/playlist";
import { handleApiMutation } from "@/utils/handleApiMutation";
import SortableVideoCard from "./SortableVideoCard";

type Props = {
  playlist: IPlaylist;
  isLoading: boolean;
  setShouldLoopAVideo: (value: boolean) => void;
  setIsShuffle: (value: boolean) => void;
  shouldLoopAVideo: boolean;
  isShuffle: boolean;
  videos: IVideo[];
  setVideos: (videos: IVideo[]) => void;
};

const PlaylistVideosMobile = ({
  playlist,
  isLoading,
  isShuffle,
  setIsShuffle,
  setShouldLoopAVideo,
  shouldLoopAVideo,
  videos,
  setVideos,
}: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const video = videos[0];

  const [reorderVideos] = useReorderPlaylistVideosMutation();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = videos.findIndex((v) => v.id === active.id);
      const newIndex = videos.findIndex((v) => v.id === over.id);
      const reorderedVideos = arrayMove(videos, oldIndex, newIndex);
      setVideos(reorderedVideos);
      handleReorderVideos(reorderedVideos.map((video) => video?.id));
    }
  };

  const handleReorderVideos = async (videoIds: string[]) => {
    await handleApiMutation(reorderVideos, { id: playlist?.id, videoIds }, 200);
  };

  return (
    <div className="fixed bottom-2 left-0 w-full z-50 flex justify-center">
      <Sheet>
        <SheetTrigger className="mx-2" asChild>
          <Card className="bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-md overflow-hidden w-full p-2">
            <div className="flex justify-between items-center w-full gap-3">
              <div className="w-[30%]">
                <div className="relative h-12">
                  {isLoading ? (
                    <Skeleton className="h-full w-full rounded-sm bg-gray-200 dark:bg-gray-700" />
                  ) : (
                    <Image
                      src={video?.thumbnailUrl}
                      alt={video?.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>
              <CardContent className="px-2 space-y-2 w-[68%]">
                {isLoading ? (
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-4 w-full rounded-sm bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-[90%] rounded-sm bg-gray-200 dark:bg-gray-700" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-sm font-semibold truncate">
                      {video?.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {video?.owner?.name}
                    </p>
                  </>
                )}
              </CardContent>
              <div>
                <ChevronUp />
              </div>
            </div>
          </Card>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[60vh] sm:h-[50vh] overflow-y-auto pb-0 mb-0 bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        >
          <SheetHeader className="pb-0 mb-0 ">
            <SheetDescription className="text-xs text-gray-800 dark:text-gray-200">
              <PlaylistHeader
                setShouldLoopAVideo={setShouldLoopAVideo}
                playlist={playlist}
                shouldLoopAVideo={shouldLoopAVideo}
                isShuffle={isShuffle}
                setIsShuffle={setIsShuffle}
              />
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <RelatedVideoLoadingSkeleton />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={videos?.map((v) => v?.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="px-2 flex flex-col gap-2">
                  {videos.map((video) => (
                    <SortableVideoCard
                      key={video.id}
                      video={video}
                      playlistId={playlist.id}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PlaylistVideosMobile;
