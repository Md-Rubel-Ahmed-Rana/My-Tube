import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PlaylistService } from "src/playlist/playlist.service";

@Injectable()
export class NewVideoUploadPlaylist {
  private readonly logger = new Logger(NewVideoUploadPlaylist.name);

  constructor(private readonly playlistService: PlaylistService) {}

  @OnEvent("video-added-to-playlist")
  async handleVideoAddToPlaylistEvent({
    playlistId,
    videoId,
  }: {
    playlistId: string;
    videoId: string;
  }) {
    this.logger.log(
      `Attempting to add video to playlist with playlist id: ${playlistId} and video id:${videoId}`
    );
    this.playlistService.addVideo(playlistId, videoId);
  }
}
