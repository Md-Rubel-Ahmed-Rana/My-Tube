import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlaylistVideoCardDesktop from "./PlaylistVideoCardDesktop";
import PlaylistVideoCardMobile from "./PlaylistVideoCardMobile";
import { IVideo } from "@/types/video.type";
import { useRouter } from "next/router";

type Props = {
  video: IVideo;
  playlistId: string;
};

const SortableVideoCard = ({ video, playlistId }: Props) => {
  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: video.id,
  });
  const { query, push } = useRouter();
  const playlistslug = query?.playlistslug as string;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCardClick = () => {
    console.log("click on video card");
    push(
      `/playlist/watch/${playlistslug}/video/${
        video?.slug
      }?title=${encodeURIComponent(video?.title)}`
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="cursor-pointer"
    >
      <div onClick={handleCardClick} className="block lg:hidden">
        <PlaylistVideoCardMobile video={video} playlistId={playlistId} />
      </div>

      <div onClick={handleCardClick} className="hidden lg:block">
        <PlaylistVideoCardDesktop video={video} playlistId={playlistId} />
      </div>
    </div>
  );
};

export default SortableVideoCard;
