import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import LogoutButton from "./LogoutButton";

const NavDropdown = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full border" variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-col justify-center items-center"
      >
        {!user?.id ? (
          <>
            <DropdownMenuItem className="w-full">Profile</DropdownMenuItem>
            <DropdownMenuItem className="w-full">My Videos</DropdownMenuItem>
            <DropdownMenuItem className="w-full">Upload Video</DropdownMenuItem>
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
            <DropdownMenuItem className="w-full block lg:hidden">
              Upload Video
            </DropdownMenuItem>
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
