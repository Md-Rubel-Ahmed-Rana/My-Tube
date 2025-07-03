import { Controller } from "@nestjs/common";
import { ChannelService } from "./channel.service";

@Controller("admin/channels")
export class AdminChannelController {
  constructor(private readonly channelService: ChannelService) {}
}
