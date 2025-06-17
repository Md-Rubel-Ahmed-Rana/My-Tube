import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@nestjs/config";
import { Readable } from "stream";
import { extractPublicId } from "src/utils/extractPublicId";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UserService {
  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
    private eventEmitter: EventEmitter2
  ) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

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

  async updateProfilePhoto(id: Types.ObjectId, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException("File is missing", HttpStatus.BAD_REQUEST);
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "my-tube/profile-photos",
        },
        async (error, result) => {
          if (error) return reject(error);

          try {
            const user = await this.userModel.findById(id);
            if (!user) {
              throw new HttpException(
                "User was not found!",
                HttpStatus.NOT_FOUND
              );
            }
            await this.userModel.findByIdAndUpdate(id, {
              $set: { photo: result?.secure_url },
            });

            if (user?.photo) {
              const publicId = extractPublicId(user.photo);

              if (publicId) {
                this.eventEmitter.emit("user-photo.deleted", publicId);
              }
            }

            resolve({
              statusCode: HttpStatus.OK,
              success: true,
              message: "Your profile photo updated successfully",
              data: null,
            });
          } catch (dbError) {
            reject(
              new HttpException(
                "Failed to update user photo",
                HttpStatus.INTERNAL_SERVER_ERROR
              )
            );
          }
        }
      );

      const readableStream = Readable.from(file.buffer);
      readableStream.pipe(uploadStream);
    });
  }
}
