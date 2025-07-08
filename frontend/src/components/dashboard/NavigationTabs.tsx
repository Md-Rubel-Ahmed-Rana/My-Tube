import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePlaylist from "./playlist/CreatePlaylist";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./NavigateTabs.module.css";

const NavigationTabs = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "!bg-blue-600 !text-white !hover:bg-blue-700" : "";

  return (
    <div
      className={`px-2 pt-3 lg:px-4 pb-3 flex items-center w-full gap-2 overflow-x-auto ${styles["custom-scroll-hide"]}`}
    >
      <Link href="/dashboard/videos">
        <Button
          size={"sm"}
          className={isActive("/dashboard/videos") || isActive("/dashboard")}
        >
          Videos
        </Button>
      </Link>
      <Link href="/dashboard/playlists">
        <Button size={"sm"} className={isActive("/dashboard/playlists")}>
          Playlists
        </Button>
      </Link>
      <Link href="/dashboard/channels">
        <Button size={"sm"} className={isActive("/dashboard/channels")}>
          Channels
        </Button>
      </Link>
      <Link href="/dashboard/watch-later">
        <Button size={"sm"} className={isActive("/dashboard/watch-later")}>
          Watch later
        </Button>
      </Link>
      <Link href={"/video/upload"}>
        <Button size={"sm"}>Upload Video</Button>
      </Link>
      {pathname === "/dashboard/playlists" && (
        <Button size={"sm"} onClick={() => setOpen(true)}>
          Create Playlist
        </Button>
      )}

      {open && <CreatePlaylist open={open} setOpen={setOpen} />}
    </div>
  );
};

export default NavigationTabs;
