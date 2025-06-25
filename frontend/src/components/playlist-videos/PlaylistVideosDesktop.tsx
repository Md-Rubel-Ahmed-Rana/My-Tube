/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { IPlaylist } from "@/types/playlist.type";
import RelatedVideoLoadingSkeleton from "@/skeletons/RelatedVideoLoading.skeleton";
import SortableVideoCard from "./SortableVideoCard";
import { IVideo } from "@/types/video.type";
import { useReorderPlaylistVideosMutation } from "@/features/playlist";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  playlist: IPlaylist;
  isLoading: boolean;
  videos: IVideo[];
  setVideos: (videos: IVideo[]) => void;
};

const PlaylistVideosDesktop = ({
  playlist,
  isLoading,
  videos,
  setVideos,
}: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));
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
    <div className="h-[65vh] flex-1 overflow-y-auto">
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
            <div className="flex flex-col gap-3">
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
    </div>
  );
};

export default PlaylistVideosDesktop;
