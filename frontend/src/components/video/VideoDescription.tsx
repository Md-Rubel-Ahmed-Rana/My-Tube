import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  description: string;
  limit?: number;
};

const VideoDescription = ({ description, limit = 200 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const plainText = description.replace(/<[^>]+>/g, "");
  const isLong = plainText.length > limit;

  const getTruncatedHTML = (html: string, maxLength: number) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    let text = "";
    const walk = (node: ChildNode | Node): string => {
      if (text.length >= maxLength) return "";

      if (node.nodeType === Node.TEXT_NODE) {
        const remaining = maxLength - text.length;
        const nodeText = node.textContent || "";
        text += nodeText.slice(0, remaining);
        return nodeText.slice(0, remaining);
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tag = element.tagName.toLowerCase();
        const inner = Array.from(node.childNodes).map(walk).join("");
        return `<${tag}>${inner}</${tag}>`;
      }

      return "";
    };

    const truncatedHTML = Array.from(div.childNodes).map(walk).join("");
    return truncatedHTML;
  };

  const content =
    expanded || !isLong ? description : getTruncatedHTML(description, limit);

  return (
    <div className="text-base text-muted-foreground mt-5 leading-relaxed space-y-2">
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: content + (!expanded && isLong ? "..." : ""),
        }}
      />

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
