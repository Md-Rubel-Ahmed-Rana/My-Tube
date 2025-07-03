import {
  ChevronsUpDown,
  Code2,
  Github,
  Home,
  LayoutDashboard,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    name: "Dashboard",
    logo: LayoutDashboard,
    url: "/admin/dashboard",
    isTargetBlank: false,
  },
  {
    name: "Home",
    logo: Home,
    url: "/",
    isTargetBlank: false,
  },
  {
    name: "Source code",
    logo: Code2,
    url: "https://github.com/Md-Rubel-Ahmed-Rana/My-Tube",
    isTargetBlank: true,
  },
  {
    name: "Github",
    logo: Github,
    url: "https://github.com/Md-Rubel-Ahmed-Rana",
    isTargetBlank: true,
  },
];
const SystemInfo = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu className="border-b pb-2">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">MyTube</span>
                <span className="truncate text-xs">Youtube alternative</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Main site
            </DropdownMenuLabel>
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                target={item.isTargetBlank ? "_blank" : "_self"}
                className="cursor-pointer"
              >
                <DropdownMenuItem className="gap-2 cursor-pointer p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <item.logo className="size-3.5 shrink-0" />
                  </div>
                  {item.name}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SystemInfo;
