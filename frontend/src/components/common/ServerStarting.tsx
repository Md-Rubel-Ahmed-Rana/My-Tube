import { useEffect, useRef, useState } from "react";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { Server, Loader2, Move } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ServerStarting = () => {
  const { isLoading } = useGetLoggedInUserQuery({});
  const cardRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("server-starting-shown");
    if (!hasShown) {
      setShouldShow(true);
      sessionStorage.setItem("server-starting-shown", "true");
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    setDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  if (!isLoading || !shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Card
        ref={cardRef}
        className={cn(
          "w-[350px] shadow-xl border bg-gray-200 dark:bg-gray-700 border-muted pointer-events-auto cursor-move transition-all p-2"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDown}
      >
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <Move className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Server is Waking Up</h2>
          </div>
          <div className="flex items-center gap-3">
            <Server className="text-muted-foreground w-5 h-5" />
            <p className="text-sm text-muted-foreground">
              Our backend is hosted on <strong>Render</strong>. If inactive for
              a while, it may take 30–60 seconds to start.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Server is being started...
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerStarting;
