/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

const NavDropdown = () => {
  const user: any = {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full border" variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user?.id ? (
          <>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>My Videos</DropdownMenuItem>
          </>
        ) : (
          <>
            <Link href={"/account/login"}>
              <DropdownMenuItem className="cursor-pointer">
                Login
              </DropdownMenuItem>
            </Link>
            <Link href={"/account/create"}>
              <DropdownMenuItem className="cursor-pointer">
                Register
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;
