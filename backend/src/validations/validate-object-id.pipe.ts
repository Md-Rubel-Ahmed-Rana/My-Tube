import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Logger,
  Inject,
  Scope,
} from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class ValidateObjectIdPipe implements PipeTransform {
  private readonly logger = new Logger(ValidateObjectIdPipe.name);

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  transform(value: string) {
    if (!isValidObjectId(value)) {
      const method = this.request.method;
      const url = this.request.originalUrl;

      this.logger.warn(
        `Invalid ObjectId received. Method: [${method}] | URL: ${url} | Value: ${value}`
      );

      throw new BadRequestException(
        `The provided ID "${value}" is not valid. Please check and try again.`
      );
    }

    return value;
  }
}
