import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IVideo } from "@/types/video.type";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

type Props = {
  video: IVideo;
};

const NyVideoActions = ({ video }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-col justify-center items-center"
      >
        <Link
          href={`/video/edit/${video?.id}?title=${video?.title}`}
          className="w-full mb-2 cursor-pointer"
        >
          <DropdownMenuItem className="w-full cursor-pointer">
            Edit
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="w-full cursor-pointer">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NyVideoActions;
