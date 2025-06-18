import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Repeat, Settings, Check } from "lucide-react";

type Props = {
  setLoop: (value: boolean) => void;
  loop: boolean;
};

const VideoSettings = ({ setLoop, loop }: Props) => {
  const handleToggleLoop = () => {
    setLoop(!loop);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Settings className="text-white" size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`flex items-center justify-between cursor-pointer ${
            loop ? "text-blue-700 font-semibold" : ""
          }`}
          onClick={handleToggleLoop}
        >
          <div className="flex items-center gap-2">
            <Repeat className={`w-4 h-4 ${loop ? "text-blue-700" : ""}`} />
            <span className={`${loop ? "text-blue-700" : ""}`}>Loop</span>
          </div>
          {loop && <Check className="w-4 h-4 text-blue-700" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VideoSettings;
