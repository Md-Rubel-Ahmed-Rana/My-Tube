import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { MongoServerError } from "mongodb";
import { Response } from "express";

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === 11000) {
      const duplicateField = Object.keys(exception.keyValue)[0];
      const duplicateValue = exception.keyValue[duplicateField];
      return response.status(409).json({
        statusCode: 409,
        message: `Duplicate key error: ${duplicateField} = "${duplicateValue}" already exists.`,
        error: "Conflict",
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: "Internal server error (MongoDB)",
      error: exception.message,
    });
  }
}
