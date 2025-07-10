type Area = { x: number; y: number; width: number; height: number };

export const getCroppedImg = async (
  imageSrc: string,
  crop: Area,
  rotation = 0
): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  const radians = (rotation * Math.PI) / 180;

  // Set canvas to match cropped area
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Move to center and rotate
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Draw rotated image with adjusted offsets
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return canvas.toDataURL("image/jpeg");
};
