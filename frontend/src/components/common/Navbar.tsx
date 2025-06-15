import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import NavDropdown from "./NavDropdown";
import SearchVideoForm from "./SearchVideoForm";

const Navbar = () => {
  return (
    <div className="w-full shadow-sm border-b bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-semibold text-md lg:text-xl">MyTube</span>
        </div>

        <SearchVideoForm />

        <div className="flex items-center gap-4">
          <div className=" hidden lg:block">
            <ModeToggle />
          </div>

          <div className=" hidden lg:block">
            <Button variant="ghost" className="border">
              <Plus className="h-5 w-5" />
              <span>Upload</span>
            </Button>
          </div>

          <NavDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
