import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import { SocketIoService } from "./socket/socket-io.service";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { MongoExceptionFilter } from "./common/filters/mongo-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>("PORT") || 4000;

  // middlewares
  app.enableCors({
    origin: ["http://localhost:3000", "https://my-tubes.vercel.app"],
    credentials: true,
  });
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix("/api/v1");
  app.use(morgan("dev"));
  app.use(cookieParser());

  const expressApp = app.getHttpAdapter().getInstance();
  const server = createServer(expressApp);

  const io = new SocketIOServer(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected to: ${socket.id}`);

    socket.on("join", (userId: string) => {
      console.log(`User joined room: ${userId}`);
      socket.join(userId);
    });
  });

  const socketIoService = app.get(SocketIoService);
  socketIoService.setSocketServer(io);

  await app.init();

  server.listen(port, () => {
    console.log(`My Tube Server is running on http://localhost:${port}`);
  });
}
bootstrap();
