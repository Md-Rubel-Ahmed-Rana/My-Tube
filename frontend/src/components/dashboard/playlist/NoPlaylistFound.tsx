import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreatePlaylist from "./CreatePlaylist";

const NoPlaylistFound = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center justify-center text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          No Playlists Available
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          You haven&apos;t created any playlists yet. Start by creating your
          first playlist to organize your videos and enhance your viewing
          experience.
        </p>
        <Button onClick={() => setOpen(true)} variant="default" size="lg">
          Create Your First Playlist
        </Button>
      </div>

      {open && <CreatePlaylist open={open} setOpen={setOpen} />}
    </>
  );
};

export default NoPlaylistFound;
