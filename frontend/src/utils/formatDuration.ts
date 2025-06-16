export const formatDuration = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const padded = (n: number) => String(n).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${padded(minutes)}:${padded(seconds)}`;
  }

  return `${minutes}:${padded(seconds)}`;
};
