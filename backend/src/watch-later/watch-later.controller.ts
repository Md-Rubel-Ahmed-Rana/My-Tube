import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Req,
  UseGuards,
  Get,
} from "@nestjs/common";
import { WatchLaterService } from "./watch-later.service";
import { CreateWatchLaterDto } from "./dto/create-watch-later.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("watch-later")
export class WatchLaterController {
  constructor(private readonly watchLaterService: WatchLaterService) {}

  @Post()
  @UseGuards(AuthGuard)
  addToWatchLater(@Body() dto: CreateWatchLaterDto, @Req() req: any) {
    return this.watchLaterService.create({ ...dto, user: req?.user?.id });
  }

  @Delete(":videoId")
  @UseGuards(AuthGuard)
  removeFromWatchLater(@Param("videoId") videoId: string, @Req() req: any) {
    return this.watchLaterService.remove(req.user.id, videoId);
  }

  @Get()
  @UseGuards(AuthGuard)
  getUserWatchLater(@Req() req: any) {
    return this.watchLaterService.findAllByUser(req?.user?.id);
  }

  @Get(":videoId/check")
  @UseGuards(AuthGuard)
  isVideoInList(@Param("videoId") videoId: string, @Req() req: any) {
    return this.watchLaterService.isVideoInWatchLater(req?.user?.id, videoId);
  }
}
