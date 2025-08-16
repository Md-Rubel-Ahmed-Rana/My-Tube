import { IWatchLater } from "@/types/watch-later.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

type Props = {
  video: IWatchLater;
};

const DeleteWatchLater = ({ video }: Props) => {
  const handleDelete = () => {
    console.log(video.id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="h-4 w-4 cursor-pointer" color="red" />
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-xl border-none bg-gray-300 dark:bg-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-800 dark:text-gray-200">
            Delete Watch Later?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-800 dark:text-gray-200">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{video.video?.title}</span> from
            Watch Later list? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 border"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWatchLater;
