import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model, Types } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    await this.userAlreadyExist(createUserDto.email);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    await this.userModel.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "User registration successful!",
      data: null,
    };
  }

  async findById(id: Types.ObjectId) {
    await this.isExist("id", id);
    const user = await this.userModel.findById(id, "-password");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "User fetched successfully!",
      data: user,
    };
  }

  async findByEmail(email: string) {
    await this.isExist("email", email);
    return await this.userModel.findOne({ email });
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, { ...updateUserDto });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "User updated successfully!",
      data: null,
    };
  }

  async isExist(field: string, value: string | Types.ObjectId) {
    const user = await this.userModel.findOne({ [field]: value });
    if (!user) {
      throw new HttpException(
        "User not found. Please register",
        HttpStatus.NOT_FOUND
      );
    } else {
      return user;
    }
  }

  async userAlreadyExist(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException(
        "User already exist. Please try to login",
        HttpStatus.CONFLICT
      );
    } else {
      return;
    }
  }
}
