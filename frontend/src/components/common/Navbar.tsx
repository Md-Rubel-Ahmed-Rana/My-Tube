import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import NavDropdown from "./NavDropdown";
import SearchVideoForm from "./SearchVideoForm";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full shadow-sm border-b bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-semibold hidden lg:block text-xl">
              MyTube
            </span>
          </div>
        </Link>

        <SearchVideoForm />

        <div className="flex items-center gap-4">
          <div className=" hidden lg:block">
            <ModeToggle />
          </div>

          <div className=" hidden lg:block">
            <Link href={"/video/create/metadata"}>
              <Button variant="ghost" className="border">
                <Plus className="h-5 w-5" />
                <span>Upload</span>
              </Button>
            </Link>
          </div>

          <NavDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
