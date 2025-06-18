import { RotateCw, RotateCcw } from "lucide-react";
import { useMediaPlayer } from "@vidstack/react";
import { Button } from "@/components/ui/button";

const SeekControls = () => {
  const player = useMediaPlayer();

  const seekBackward = () => {
    if (player) {
      const currentTime = player.currentTime ?? 0;
      player.currentTime = Math.max(currentTime - 10, 0);
    }
  };

  const seekForward = () => {
    if (player) {
      const currentTime = player.currentTime ?? 0;
      player.currentTime = currentTime + 10;
    }
  };

  return (
    <div className="flex gap-4 absolute bottom-14 right-1/2 z-50 translate-x-1/2">
      <Button
        size={"sm"}
        onClick={seekBackward}
        className="relative flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition"
      >
        <RotateCcw size={50} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] font-semibold text-white pointer-events-none">
          10s
        </span>
      </Button>

      <Button
        size={"sm"}
        onClick={seekForward}
        className="relative flex items-center justify-center  rounded-full bg-black/60 text-white hover:bg-black/70 transition"
      >
        <RotateCw size={50} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] font-semibold text-white pointer-events-none">
          10s
        </span>
      </Button>
    </div>
  );
};

export default SeekControls;
