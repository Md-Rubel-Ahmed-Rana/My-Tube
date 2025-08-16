import { IWatchLater } from "@/types/watch-later.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteWatchLater from "./DeleteWatchLater";

type Props = {
  videos: IWatchLater[];
};

const WatchLaterTable = ({ videos = [] }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] text-gray-800 dark:text-gray-200">
            #
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            User
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            Video
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            Added at
          </TableHead>
          <TableHead className="text-gray-800 dark:text-gray-200">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {videos.map((item, idx) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium text-gray-800 dark:text-gray-200">
              {idx + 1}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-200">
              {item.user?.name}
            </TableCell>
            <TableCell className="font-semibold text-gray-800 dark:text-gray-200 max-w-[300px] w-full truncate">
              {item.video?.title}
            </TableCell>

            <TableCell className="text-gray-800 dark:text-gray-200">
              {new Date(item.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-200">
              {/* <Trash2 className="w-4 h-4" color="red" /> */}
              <DeleteWatchLater video={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WatchLaterTable;
