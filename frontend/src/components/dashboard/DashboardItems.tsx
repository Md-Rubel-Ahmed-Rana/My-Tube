import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CreatePlaylist from "./playlist/CreatePlaylist";
import { useState } from "react";

const navItems = [
  { href: "/dashboard/videos", label: "Videos" },
  { href: "/dashboard/playlists", label: "Playlists" },
];

const DashboardItems = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const isOnPlaylists = pathname === "/dashboard/playlists";

  return (
    <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "px-4",
                isActive ? "font-semibold" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Button>
          </Link>
        );
      })}

      {isOnPlaylists && (
        <Button onClick={() => setOpen(true)} className="px-4">
          Create Playlist
        </Button>
      )}

      {open && <CreatePlaylist open={open} setOpen={setOpen} />}
    </div>
  );
};

export default DashboardItems;
