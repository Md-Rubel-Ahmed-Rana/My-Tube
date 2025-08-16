import { IWatchLater } from "@/types/watch-later.type";

type Props = {
  videos: IWatchLater[];
};

const WatchLaterTable = ({ videos = [] }: Props) => {
  return <div>{videos.length}</div>;
};

export default WatchLaterTable;
