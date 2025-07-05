import {
  IsMongoId,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";

class WatchHistoryItemDto {
  @IsMongoId()
  video: string;

  @IsOptional()
  @Type(() => Date)
  watchedAt?: Date;

  @IsOptional()
  @IsNumber()
  duration?: number;
}

export class CreateUserActivityDto {
  @IsMongoId()
  user: string;

  @IsOptional()
  @IsNumber()
  videosWatched?: number;

  @IsOptional()
  @IsNumber()
  minutesWatched?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WatchHistoryItemDto)
  watchHistory?: WatchHistoryItemDto[];

  @IsOptional()
  @IsNumber()
  likesGiven?: number;

  @IsOptional()
  @IsNumber()
  commentsMade?: number;

  @IsOptional()
  @IsNumber()
  videosUploaded?: number;

  @IsOptional()
  @IsNumber()
  subscribers?: number;
}
