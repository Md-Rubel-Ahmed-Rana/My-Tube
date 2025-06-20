import { IsString } from "class-validator";

export class ModifyVideoDto {
  @IsString()
  videoId: string;
}
