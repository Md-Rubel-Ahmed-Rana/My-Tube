import { PartialType } from "@nestjs/mapped-types";
import { CreatePlaylistDto } from "./create-playlist.dto";

import {
  IsOptional,
  IsString,
  IsEnum,
  IsMongoId,
  IsArray,
} from "class-validator";
import { PlaylistStatus } from "../enums";

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsEnum(PlaylistStatus)
  status?: PlaylistStatus;

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  videos?: string[];

  @IsOptional()
  @IsMongoId()
  user?: string;
}
