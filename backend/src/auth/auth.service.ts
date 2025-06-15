import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { Types } from "mongoose";

@Injectable()
export class AuthService {
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

  async auth(id: Types.ObjectId) {
    return await this.userService.findById(id);
  }
}
