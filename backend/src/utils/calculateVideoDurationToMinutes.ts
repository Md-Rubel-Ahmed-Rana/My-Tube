export const calculateVideoDurationToMinutes = (duration: number): number => {
  return Math.round(Math.floor(duration / 60));
};
