import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { Types } from "mongoose";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await this.userService.isExist("email", credentials.email);

    const isMatched = await bcrypt.compare(credentials.password, user.password);

    if (!isMatched) {
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtService.signAsync(
      {
        id: user?.id || user?._id,
        email: user?.email,
      },
      { secret: this.configService.get<string>("JWT_SECRET") }
    );

    return `Bearer ${token}`;
  }

  private async getOrCreateUserAndGenerateToken(
    credentials: GoogleLoginDto
  ): Promise<string> {
    const isExist = await this.userService.getUserByEmailForGoogleLogin(
      credentials.email
    );

    const user = isExist?._id
      ? isExist
      : await this.userService.createUserWithGoogle(credentials);

    const token = await this.jwtService.signAsync(
      {
        id: user?.id || user?._id,
        email: user?.email,
      },
      { secret: this.configService.get<string>("JWT_SECRET") }
    );

    return `Bearer ${token}`;
  }

  async googleLogin(credentials: GoogleLoginDto): Promise<string> {
    return this.getOrCreateUserAndGenerateToken(credentials);
  }

  async googleOneTapLogin(idToken: string): Promise<string> {
    if (!idToken)
      throw new HttpException("ID Token required", HttpStatus.BAD_REQUEST);

    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.configService.get<string>("GOOGLE_CLIENT_ID"),
    });

    const payload = ticket.getPayload();
    if (!payload)
      throw new HttpException("Invalid Google token", HttpStatus.UNAUTHORIZED);

    const credentials = {
      username: payload.sub,
      email: payload.email,
      name: payload.name,
      photo: payload.picture,
      slug: "",
    };

    return this.getOrCreateUserAndGenerateToken(credentials);
  }

  async auth(id: Types.ObjectId) {
    return await this.userService.findById(id);
  }
}
