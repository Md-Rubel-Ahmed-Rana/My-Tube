import { Button } from "@/components/ui/button";
import { useGetPlaylistVideosBySlugQuery } from "@/features/playlist";
import { IPlaylist } from "@/types/playlist.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/router";

const NextPrevVideo = () => {
  const { query, push, asPath, isReady } = useRouter();
  const playlistslug = query?.playlistslug as string;
  const videoslug = query?.videoslug as string;
  const isOwnerRoute = isReady && asPath?.startsWith("/playlist/watch/");

  const { data, isLoading } = useGetPlaylistVideosBySlugQuery({
    slug: playlistslug,
  });

  const playlist = data?.data as IPlaylist;
  const videos = playlist?.videos || [];

  const currentIndex = videos.findIndex((video) => video.slug === videoslug);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevVideo = videos[currentIndex - 1];
      if (isOwnerRoute) {
        push(
          `/playlist/watch/${playlistslug}/video/${
            prevVideo?.slug
          }?title=${encodeURIComponent(prevVideo?.title)}`
        );
      } else {
        const path = `/channel/playlists/watch/${playlistslug}/video/${
          prevVideo?.slug
        }?title=${encodeURIComponent(prevVideo?.title)}`;
        push(path);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      const nextVideo = videos[currentIndex + 1];
      if (isOwnerRoute) {
        push(
          `/playlist/watch/${playlistslug}/video/${
            nextVideo?.slug
          }?title=${encodeURIComponent(nextVideo?.title)}`
        );
      } else {
        const path = `/channel/playlists/watch/${playlistslug}/video/${
          nextVideo?.slug
        }?title=${encodeURIComponent(nextVideo?.title)}`;
        push(path);
      }
    }
  };

  if (isLoading || !playlist) return null;

  return (
    <div className="flex gap-2 absolute bottom-8 left-1/2 -translate-x-1/2">
      <Button
        size="icon"
        variant="outline"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={handleNext}
        disabled={currentIndex === videos.length - 1 || videos.length === 0}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NextPrevVideo;
