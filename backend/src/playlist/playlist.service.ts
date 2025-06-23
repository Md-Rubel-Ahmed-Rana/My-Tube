import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { Playlist } from "./playlist.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Slugify } from "src/utils/slugify";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    createPlaylistDto.slug = Slugify.generatePlaylistSlug(
      createPlaylistDto.name
    );
    const playlist = await this.playlistModel.create(createPlaylistDto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Playlist created successfully",
      data: playlist,
    };
  }

  async getAllByUser(userId: string) {
    const playlists = await this.playlistModel.find({ user: userId }).populate([
      {
        path: "videos",
        select: "title",
      },
    ]);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlists fetched successfully",
      data: playlists,
    };
  }

  async getOne(id: string) {
    const playlist = await this.playlistModel.findById(id).populate([
      {
        path: "videos",
        populate: {
          path: "owner",
          select: "-password",
        },
      },
    ]);

    if (!playlist) {
      throw new HttpException("Playlist not found", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlist fetched successfully",
      data: playlist,
    };
  }

  async update(id: string, updateDto: { name?: string }) {
    const playlist = await this.playlistModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlist updated successfully",
      data: playlist,
    };
  }

  async remove(id: string) {
    await this.playlistModel.findByIdAndDelete(id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Playlist deleted successfully",
      data: null,
    };
  }

  async addVideo(playlistId: string, videoId: string) {
    const playlist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $addToSet: { videos: videoId } },
      { new: true }
    );
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video added to playlist",
      data: playlist,
    };
  }

  async removeVideo(playlistId: string, videoId: string) {
    const playlist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $pull: { videos: videoId } },
      { new: true }
    );
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Video removed from playlist",
      data: playlist,
    };
  }
}
