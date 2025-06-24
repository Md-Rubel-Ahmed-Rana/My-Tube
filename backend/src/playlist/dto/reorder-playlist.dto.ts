import { IsArray, IsString } from "class-validator";

export class ReorderPlaylistDto {
  @IsArray()
  @IsString({ each: true })
  videoIds: string[];
}
