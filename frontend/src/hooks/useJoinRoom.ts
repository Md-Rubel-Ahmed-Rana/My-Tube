import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
const server = process.env.NEXT_PUBLIC_ROOT_API as string;

export const useJoinRoom = (userId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (!userId) {
      toast.info("No userId found in route params.");
      return;
    }

    const socket = io(server);
    socketRef.current = socket;

    socket.on("connect", () => {
      toast.info(`Socket connected with ID: ${userId}`);
      socket.emit("join", userId);
    });

    return () => {
      socket.disconnect();
    };
  }, [router.isReady, userId]);

  return socketRef;
};
