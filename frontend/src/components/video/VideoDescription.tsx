"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  description: string;
  limit?: number;
};

const VideoDescription = ({ description, limit = 200 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > limit;
  const shownText = expanded ? description : description.slice(0, limit);

  return (
    <div className="text-base text-muted-foreground leading-relaxed space-y-2">
      <p className="whitespace-pre-wrap">
        {shownText}
        {!expanded && isLong && "..."}
      </p>

      {isLong && (
        <Button
          variant="ghost"
          className="text-sm p-0 h-auto underline"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "See less" : "See more"}
        </Button>
      )}
    </div>
  );
};

export default VideoDescription;
