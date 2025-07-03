import { Module } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Channel, ChannelSchema } from "./channel.schema";
import { ConfigService } from "@nestjs/config";
import { AdminChannelController } from "./admin-channel.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
  controllers: [ChannelController, AdminChannelController],
  providers: [ChannelService, ConfigService],
  exports: [MongooseModule],
})
export class ChannelModule {}
