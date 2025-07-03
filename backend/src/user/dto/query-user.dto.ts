import { IsOptional, IsEnum, IsString, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { UserStatus } from "../enums";

export class QueryUserDto {
  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status must be one of: ${Object.values(UserStatus).join(", ")}`,
  })
  status?: UserStatus;

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
  limit?: number = 20;
}
