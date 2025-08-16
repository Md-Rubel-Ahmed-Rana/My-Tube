import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Req,
  UseGuards,
  Get,
  Query,
} from "@nestjs/common";
import { WatchLaterService } from "./watch-later.service";
import { CreateWatchLaterDto } from "./dto/create-watch-later.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("watch-later")
export class WatchLaterController {
  constructor(private readonly watchLaterService: WatchLaterService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.watchLaterService.findAll(Number(page), Number(limit));
  }

  @Post()
  @UseGuards(AuthGuard)
  addToWatchLater(@Body() dto: CreateWatchLaterDto, @Req() req: any) {
    return this.watchLaterService.create({ ...dto, user: req?.user?.id });
  }

  @Delete("delete/:id")
  @UseGuards(AuthGuard)
  deleteWatchLater(@Param("id") id: string) {
    return this.watchLaterService.deleteWatchLater(id);
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
