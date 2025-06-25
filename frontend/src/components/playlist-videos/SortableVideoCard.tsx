import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlaylistVideoCardDesktop from "./PlaylistVideoCardDesktop";
import PlaylistVideoCardMobile from "./PlaylistVideoCardMobile";
import { IVideo } from "@/types/video.type";

type Props = {
  video: IVideo;
  playlistId: string;
};

const SortableVideoCard = ({ video, playlistId }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="block lg:hidden">
        <PlaylistVideoCardMobile video={video} playlistId={playlistId} />
      </div>

      <div className="hidden lg:block">
        <PlaylistVideoCardDesktop video={video} playlistId={playlistId} />
      </div>
    </div>
  );
};

export default SortableVideoCard;
