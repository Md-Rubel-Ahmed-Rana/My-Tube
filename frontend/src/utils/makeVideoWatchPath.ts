export const makeVideoWatchPath = ({
  title,
  slug,
}: {
  title: string;
  slug: string;
}): string => {
  return `/video/watch/${slug}?title=${title}`;
};
