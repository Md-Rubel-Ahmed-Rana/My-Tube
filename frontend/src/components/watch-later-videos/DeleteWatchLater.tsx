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
import { useDeleteWatchLaterMutation } from "@/features/watch-later";
import { handleApiMutation } from "@/utils/handleApiMutation";

type Props = {
  item: IWatchLater;
};

const DeleteWatchLater = ({ item }: Props) => {
  const [remove, { isLoading }] = useDeleteWatchLaterMutation();
  const handleDelete = async () => {
    await handleApiMutation(remove, { id: item?.id }, 200);
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
            <span className="font-semibold">{item.video?.title}</span> from
            Watch Later list? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 border"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWatchLater;
