import { IsEnum } from "class-validator";
import { UserStatus } from "../enums";

export class UpdateUserStatusDto {
  @IsEnum(UserStatus, {
    message: `Status must be one of: ${Object.values(UserStatus).join(", ")}`,
  })
  status: UserStatus;
}
