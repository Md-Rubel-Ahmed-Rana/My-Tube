/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCroppedImg } from "@/utils/cropImageUtils";
import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Minus, Plus, RotateCcw, RotateCw } from "lucide-react";

type Props = {
  imageSrc: string;
  setImageSrc: (imageSrc: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ThumbnailImageCrop = ({
  imageSrc,
  open,
  setOpen,
  setImageSrc,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation
    );

    setImageSrc(croppedImage);
    setOpen(false);
  };

  const adjustZoom = (delta: number) => {
    setZoom((z) =>
      Math.min(3, Math.max(1, parseFloat((z + delta).toFixed(2))))
    );
  };

  const adjustRotation = (delta: number) => {
    setRotation((r) => (r + delta + 360) % 360);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Thumbnail image</DialogTitle>
          <DialogDescription>Adjust your video thumbnail</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {imageSrc && (
            <>
              <div className="relative w-full h-[300px] bg-black rounded overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustZoom(-0.1)}
                >
                  <Minus size={18} />
                </Button>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={[zoom]}
                  onValueChange={(val) => setZoom(val[0])}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustZoom(0.1)}
                >
                  <Plus size={18} />
                </Button>
              </div>

              {/* Rotation Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustRotation(-15)}
                >
                  <RotateCcw size={20} />
                </Button>
                <Slider
                  min={0}
                  max={360}
                  step={1}
                  value={[rotation]}
                  onValueChange={(val) => setRotation(val[0])}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustRotation(15)}
                >
                  <RotateCw size={20} />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center w-full mt-6 gap-4 flex-wrap sm:flex-nowrap">
          <DialogClose asChild>
            <Button className="w-full sm:w-auto">Don&apos;t crop</Button>
          </DialogClose>
          <Button
            onClick={handleCrop}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            Crop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThumbnailImageCrop;
