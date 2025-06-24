import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("channels")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Patch("subscribe")
  @UseGuards(AuthGuard)
  subscribe(
    @Body() dto: CreateChannelDto,
    @Req() req: { user: { id: string } }
  ) {
    return this.channelService.subscribe({
      ...dto,
      user: req.user?.id,
    });
  }

  @Patch("unsubscribe")
  @UseGuards(AuthGuard)
  unsubscribe(
    @Body() dto: CreateChannelDto,
    @Req() req: { user: { id: string } }
  ) {
    return this.channelService.unsubscribe({
      ...dto,
      user: req.user?.id,
    });
  }

  @Get("me")
  @UseGuards(AuthGuard)
  getChannels(@Req() req: { user: { id: string } }) {
    return this.channelService.getChannels(req?.user?.id);
  }

  @Get("is-subscribed/:channelId")
  @UseGuards(AuthGuard)
  isSubscribed(
    @Req() req: { user: { id: string } },
    @Param("channelId") channelId: string
  ) {
    return this.channelService.isSubscribed(req?.user?.id, channelId);
  }

  @Get()
  findAll() {
    return this.channelService.findAll();
  }
}
