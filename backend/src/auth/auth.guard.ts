import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  private cookieName = "my_tube_access_token";
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      this.logout(response);
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      request["user"] = payload;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        this.logger.error(`JWT Expired. Error: ${error?.message}`);
      } else {
        this.logger.error(`JWT error. Error: ${error?.message}`);
      }
      this.logout(response);
      throw new UnauthorizedException();
    }
    return true;
  }

  private logout(response: Response): void {
    response.clearCookie(this.cookieName);
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const bearerToken = request.cookies[this.cookieName] as string;
    if (!bearerToken) {
      this.logger.warn(`Bearer token was not found`);
      throw new UnauthorizedException();
    }
    const token = bearerToken ? bearerToken?.split(" ")[1] : undefined;
    return token;
  }
}
