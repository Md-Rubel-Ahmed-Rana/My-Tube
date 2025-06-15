import { IsOptional, IsString, IsNumberString } from "class-validator";

export class QueryVideoDto {
  @IsOptional()
  @IsString()
  searchText?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  [key: string]: any;
}
