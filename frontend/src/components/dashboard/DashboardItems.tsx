import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/videos", label: "Videos" },
  { href: "/dashboard/playlists", label: "Playlists" },
];

const DashboardItems = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
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
    </div>
  );
};

export default DashboardItems;
