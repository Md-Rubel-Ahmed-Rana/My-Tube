import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import LogoutButton from "./LogoutButton";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";
import { Menu } from "lucide-react";
import Spinner from "./Spinner";

const NavDropdown = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          {isLoading ? (
            <Spinner />
          ) : user?.id ? (
            <Avatar className="h-8 lg:h-10 w-8 lg:w-10 cursor-pointer">
              <AvatarImage src={user?.photo} alt="profile image" />
              <AvatarFallback>
                {formatNameForImageFallback(user?.name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button>
              <Menu />
            </Button>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex flex-col justify-center items-center"
      >
        {user?.id ? (
          <>
            <Link
              href={`/profile/${
                user?.username || user?.name?.split(" ")?.join("-")
              }?name=${user?.name}`}
              className="w-full mb-2 cursor-pointer"
            >
              <DropdownMenuItem className="w-full cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard"} className="w-full mb-2 cursor-pointer">
              <DropdownMenuItem className="w-full cursor-pointer">
                My Videos
              </DropdownMenuItem>
            </Link>
            <Link href={"/video/upload"} className="w-full mb-2 cursor-pointer">
              <DropdownMenuItem className="w-full cursor-pointer">
                Upload Video
              </DropdownMenuItem>
            </Link>
            <LogoutButton />
            <DropdownMenuItem className="w-full block lg:hidden">
              <ModeToggle />
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <Link className="w-full" href={"/account/login"}>
              <DropdownMenuItem className="cursor-pointer">
                Login
              </DropdownMenuItem>
            </Link>
            <Link className="w-full" href={"/account/create"}>
              <DropdownMenuItem className="cursor-pointer">
                Register
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="block lg:hidden">
              <ModeToggle />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;
