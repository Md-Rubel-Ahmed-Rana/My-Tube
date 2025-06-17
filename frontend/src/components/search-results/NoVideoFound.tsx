import { Button } from "@/components/ui/button";
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";
import { useRouter } from "next/router";

const NoVideoFound = () => {
  const { query } = useRouter();
  const search_query = query?.search_query as string;
  return (
    <NoDataFound message="No videos found">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-muted-foreground">
          We couldn&apos;t find any videos matching:
          <span className="font-bold text-primary ml-1">
            &quot;{search_query}&quot;
          </span>
        </h2>
        <p className="text-sm text-gray-500">
          Try adjusting your search or be the first to upload a video on this
          topic.
        </p>
        <Link href="/video/upload">
          <Button size="sm" className="mt-2">
            Upload Video
          </Button>
        </Link>
      </div>
    </NoDataFound>
  );
};

export default NoVideoFound;
