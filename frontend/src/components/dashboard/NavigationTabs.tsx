import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePlaylist from "./playlist/CreatePlaylist";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NavigationTabs = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "!bg-blue-600 !text-white !hover:bg-blue-700" : "";

  return (
    <div className="px-2 pt-3 lg:px-4 flex items-center flex-wrap gap-2">
      <Link href="/dashboard/videos">
        <Button className={isActive("/dashboard/videos")}>Videos</Button>
      </Link>
      <Link href="/dashboard/playlists">
        <Button className={isActive("/dashboard/playlists")}>Playlists</Button>
      </Link>
      <Link href="/dashboard/channels">
        <Button className={isActive("/dashboard/channels")}>Channels</Button>
      </Link>
      <Link href="/dashboard/watch-later">
        <Button className={isActive("/dashboard/watch-later")}>
          Watch later
        </Button>
      </Link>
      {pathname === "/dashboard/playlists" && (
        <Button onClick={() => setOpen(true)} variant="outline">
          Create Playlist
        </Button>
      )}

      {open && <CreatePlaylist open={open} setOpen={setOpen} />}
    </div>
  );
};

export default NavigationTabs;
