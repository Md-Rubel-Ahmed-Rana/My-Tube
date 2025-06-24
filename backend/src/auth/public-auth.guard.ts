import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class PublicAuthGuard implements CanActivate {
  private readonly logger = new Logger(PublicAuthGuard.name);
  private readonly cookieName = "my_tube_access_token";

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>("JWT_SECRET"),
        });
        request["user"] = payload;
      } catch (error: any) {
        if (error.name === "TokenExpiredError") {
          this.logger.warn(`JWT expired: ${error?.message}`);
        } else {
          this.logger.warn(`JWT error: ${error?.message}`);
        }
      }
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const bearerToken = request.cookies?.[this.cookieName];
    if (!bearerToken) {
      return undefined;
    }

    const token = bearerToken.startsWith("Bearer ")
      ? bearerToken.split(" ")[1]
      : bearerToken;

    return token;
  }
}
