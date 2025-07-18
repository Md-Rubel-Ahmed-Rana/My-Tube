import { IsOptional, IsEnum, IsString, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class QueryPlaylistDto {
  @IsOptional()
  @IsString()
  searchQuery?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
