import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, User } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

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
          <span className="font-semibold text-xl">MyTube</span>
        </div>

        <div className="flex-1 max-w-xl mx-4 relative">
          <Input placeholder="Search videos..." className="pl-10 pr-4 py-2" />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          <Button variant="ghost" className="ring-1">
            <Plus className="h-5 w-5" />
            <span>Create</span>
          </Button>

          <Button className="rounded-full ring-1" variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
