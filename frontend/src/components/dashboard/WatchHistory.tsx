import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useGetUserWatchHistoryQuery } from "@/features/user";
import { IUserWatchHistory } from "@/types/user.type";
import moment from "moment";
import TopChannelsLoadingSkeleton from "@/skeletons/TopChannelsLoading.skeleton";
import { useRouter } from "next/router";
import { IVideo } from "@/types/video.type";
import { makeVideoWatchPath } from "@/utils/makeVideoWatchPath";

const WatchHistory = () => {
  const { data, isLoading } = useGetUserWatchHistoryQuery({});
  const router = useRouter();
  const histories = (data?.data || []) as IUserWatchHistory[];

  const handleNavigate = (video: IVideo) => {
    router.push(makeVideoWatchPath(video));
  };

  return (
    <Card className="p-2 bg-gray-200 dark:bg-gray-800">
      <h2 className="text-sm font-semibold px-2 pb-2">Watch Histories</h2>
      {isLoading ? (
        <TopChannelsLoadingSkeleton />
      ) : (
        <>
          {histories?.length <= 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="text-sm">No watch history</span>
            </div>
          ) : (
            <ScrollArea className="max-h-[300px] h-full pr-2">
              <ul className="space-y-2">
                {histories.map((history) => (
                  <li
                    key={history?.id || history?._id}
                    className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-muted cursor-pointer transition"
                    onClick={() => handleNavigate(history?.video)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          history?.video?.thumbnailUrl ||
                          `https://api.dicebear.com/8.x/initials/svg?seed=${history?.video?.title}`
                        }
                        alt={history?.video?.title}
                      />
                      <AvatarFallback>
                        {history?.video?.title.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm truncate">
                        {history?.video?.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {moment(history?.watchedAt || new Date()).fromNow()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </>
      )}
    </Card>
  );
};

export default WatchHistory;
