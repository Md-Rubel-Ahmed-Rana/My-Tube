import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>("PORT") || 4000;

  // middlewares
  app.enableCors({
    origin: ["http://localhost:3000", "https://my-tube-pi-fawn.vercel.app"],
    credentials: true,
  });
  app.setGlobalPrefix("/api/v1");
  app.use(morgan("dev"));
  app.use(cookieParser());

  await app.listen(port);
  console.log(`My Tube Server is running on http://localhost:${port}`);
}
bootstrap();
