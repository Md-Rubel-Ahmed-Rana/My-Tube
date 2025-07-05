import { Module } from "@nestjs/common";
import { WatchLaterService } from "./watch-later.service";
import { WatchLaterController } from "./watch-later.controller";
import { WatchLater, WatchLaterSchema } from "./watch-later.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WatchLater.name, schema: WatchLaterSchema },
    ]),
  ],
  controllers: [WatchLaterController],
  providers: [WatchLaterService, ConfigService],
})
export class WatchLaterModule {}
