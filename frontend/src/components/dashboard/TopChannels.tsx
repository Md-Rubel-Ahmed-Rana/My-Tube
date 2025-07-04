import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const topChannels = [
  { id: "1", name: "Rubel", photo: "" },
  { id: "2", name: "TechSaga", photo: "" },
  { id: "3", name: "CoderZilla", photo: "" },
  { id: "4", name: "NextMastery", photo: "" },
  { id: "5", name: "DesignWave", photo: "" },
  { id: "6", name: "DailyVlogs", photo: "" },
  { id: "7", name: "FoodLovers", photo: "" },
  { id: "8", name: "AI Today", photo: "" },
  { id: "9", name: "GamingX", photo: "" },
  { id: "10", name: "CryptoTalk", photo: "" },
  { id: "11", name: "OpenSourceTV", photo: "" },
];

const TopChannels = () => {
  return (
    <Card className="p-2 bg-gray-200 dark:bg-gray-800">
      <h2 className="text-sm font-semibold px-2 pb-2">Top Channels</h2>
      <ScrollArea className="h-[300px] pr-2">
        <ul className="space-y-2">
          {topChannels.map((channel) => (
            <li
              key={channel.id}
              className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-muted cursor-pointer transition"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    channel.photo ||
                    `https://api.dicebear.com/8.x/initials/svg?seed=${channel.name}`
                  }
                  alt={channel.name}
                />
                <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm truncate">{channel.name}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </Card>
  );
};

export default TopChannels;
