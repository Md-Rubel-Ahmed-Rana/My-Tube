"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetLoggedInAdminQuery } from "@/features/admin";
import { formatNameForImageFallback } from "@/utils/formatNameForImageFallback";
import { IUser } from "@/types/user.type";
import { IAdmin } from "@/types/admin.type";
import Spinner from "./Spinner";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./ModeToggle";
import { Menu } from "lucide-react";

const NavDropdown = () => {
  const { data: userData, isLoading: isUserLoading } = useGetLoggedInUserQuery(
    {}
  );
  const { data: adminData, isLoading: isAdminLoading } =
    useGetLoggedInAdminQuery({});

  const user = userData?.data as IUser;
  const admin = adminData?.data as IAdmin;

  const isLoading = isUserLoading || isAdminLoading;

  // === Loading Spinner ===
  if (isLoading) {
    return <Spinner />;
  }

  // === Admin Shortcut Avatar ===
  if (admin?.email) {
    return (
      <Link href="/admin/dashboard">
        <Avatar className="h-8 lg:h-10 w-8 lg:w-10 cursor-pointer">
          <AvatarImage src={admin.photo} alt="Admin image" />
          <AvatarFallback>
            {formatNameForImageFallback(admin.name)}
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  // === User Dropdown ===
  if (user?.email) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 lg:h-10 w-8 lg:w-10 cursor-pointer">
            <AvatarImage src={user.photo} alt="User image" />
            <AvatarFallback>
              {formatNameForImageFallback(user.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="flex flex-col items-center">
          <Link href={`/dashboard`} className="w-full">
            <DropdownMenuItem className="w-full cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/videos" className="w-full">
            <DropdownMenuItem className="w-full mb-2 cursor-pointer">
              My Videos
            </DropdownMenuItem>
          </Link>
          <Link href="/video/upload" className="w-full">
            <DropdownMenuItem className="w-full mb-2 cursor-pointer">
              Upload video
            </DropdownMenuItem>
          </Link>
          <LogoutButton />
          <DropdownMenuItem className="w-full block lg:hidden">
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // === No user or admin ===
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col items-center">
        <Link className="w-full" href="/account/login">
          <DropdownMenuItem className="w-full cursor-pointer">
            Login
          </DropdownMenuItem>
        </Link>
        <Link className="w-full" href="/admin/login">
          <DropdownMenuItem className="w-full cursor-pointer">
            Login as admin
          </DropdownMenuItem>
        </Link>
        <Link className="w-full" href="/account/create">
          <DropdownMenuItem className="w-full cursor-pointer">
            Register
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="block lg:hidden">
          <ModeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;
