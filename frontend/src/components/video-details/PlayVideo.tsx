import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  videoUrl: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const PlayVideo = ({ videoUrl, open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <div className="w-full h-[500px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayVideo;
