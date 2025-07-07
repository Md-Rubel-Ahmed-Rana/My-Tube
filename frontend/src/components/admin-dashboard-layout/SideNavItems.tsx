import {
  ChevronRight,
  Users,
  UsersRound,
  Video,
  VideoIcon,
  Eye,
  LayoutDashboard,
  ListVideo,
  ListChecks,
  Film,
  UserCog,
  UserPlus2,
  UserRound,
  MessageCircle,
  MessageSquareText,
  MessageSquare,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const rootPath = "/admin/dashboard";

const navMain = [
  {
    title: "Manage admins",
    icon: UserCog,
    isActive: false,
    items: [
      {
        title: "All admins",
        url: `${rootPath}/admins`,
        icon: Users,
      },
      {
        title: "Create admin",
        url: `${rootPath}/admins/create`,
        icon: UserPlus2,
      },
    ],
  },
  {
    title: "Manage users",
    icon: Users,
    isActive: false,
    items: [
      {
        title: "Users stats",
        url: `${rootPath}/users/stats`,
        icon: LayoutDashboard,
      },
      {
        title: "All users",
        url: `${rootPath}/users`,
        icon: UsersRound,
      },
    ],
  },
  {
    title: "Manage videos",
    icon: Video,
    isActive: false,
    items: [
      {
        title: "Videos stats",
        url: `${rootPath}/videos/stats`,
        icon: LayoutDashboard,
      },
      {
        title: "All videos",
        url: `${rootPath}/videos`,
        icon: ListVideo,
      },
      {
        title: "Video details",
        url: `${rootPath}/videos/details`,
        icon: VideoIcon,
      },
      {
        title: "Video by status",
        url: `${rootPath}/videos/status`,
        icon: Eye,
      },
      {
        title: "Video by channel",
        url: `${rootPath}/videos/channel`,
        icon: Film,
      },
    ],
  },
  {
    title: "Manage playlists",
    icon: ListChecks,
    isActive: false,
    items: [
      {
        title: "All playlists",
        url: `${rootPath}/playlists`,
        icon: ListVideo,
      },
      {
        title: "Playlist details",
        url: `${rootPath}/playlists/details`,
        icon: VideoIcon,
      },
    ],
  },
  {
    title: "Manage comments",
    icon: MessageSquare,
    isActive: false,
    items: [
      {
        title: "Comments stats",
        url: `${rootPath}/comments/stats`,
        icon: LayoutDashboard,
      },
      {
        title: "All comments",
        url: `${rootPath}/comments`,
        icon: MessageSquareText,
      },
      {
        title: "Comments by video",
        url: `${rootPath}/comments/video`,
        icon: MessageCircle,
      },
      {
        title: "Comments by user",
        url: `${rootPath}/comments/user`,
        icon: UserRound,
      },
    ],
  },
];

const SideNavItems = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navMain.map((item) => {
          const isSectionActive = item.items?.some((subItem) =>
            pathname.startsWith(subItem.url)
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isSectionActive}
              className="group/collapsible mb-3"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isActive = pathname === subItem.url;

                      return (
                        <SidebarMenuSubItem
                          className="mb-2"
                          key={subItem.title}
                        >
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={subItem.url}
                              className={
                                isActive ? "text-primary font-medium" : ""
                              }
                            >
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SideNavItems;
