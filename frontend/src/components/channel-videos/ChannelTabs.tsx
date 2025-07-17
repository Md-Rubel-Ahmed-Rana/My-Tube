import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  user: IUser;
};

const ChannelTabs = ({ user }: Props) => {
  const pathname = usePathname();

  const isActive = (matchPath: string) =>
    pathname?.startsWith(matchPath)
      ? "!bg-blue-600 !text-white !hover:bg-blue-700"
      : "";

  return (
    <div className="flex items-center w-full gap-2 overflow-x-auto">
      <Link href={`/channel/videos/${user?.slug}?name=${user?.name}`}>
        <Button
          size="sm"
          className={
            isActive(`/channel/videos`) || isActive(`/channel/${user?.slug}`)
          }
        >
          Videos
        </Button>
      </Link>
      <Link href={`/channel/playlists/${user?.slug}?name=${user?.name}`}>
        <Button size="sm" className={isActive(`/channel/playlists`)}>
          Playlists
        </Button>
      </Link>
    </div>
  );
};

export default ChannelTabs;
