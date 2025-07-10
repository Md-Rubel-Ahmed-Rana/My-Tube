import { Injectable } from "@nestjs/common";
import { Server as SocketIOServer } from "socket.io";

@Injectable()
export class SocketIoService {
  private io: SocketIOServer;

  setSocketServer(io: SocketIOServer) {
    this.io = io;
  }

  getSocketServer(): SocketIOServer {
    return this.io;
  }
}
