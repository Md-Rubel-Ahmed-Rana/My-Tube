import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./admin.schema";
import { v2 as cloudinary } from "cloudinary";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { extractPublicId } from "src/utils/extractPublicId";
import { Readable } from "stream";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    createAdminDto.password = await bcrypt.hash(createAdminDto.password, 12);
    await this.adminModel.create(createAdminDto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Admin registration successful!",
      data: null,
    };
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<string> {
    const admin = await this.adminModel.findOne({ email: credentials.email });

    if (!admin) {
      throw new HttpException("Account was not found", HttpStatus.NOT_FOUND);
    }
    const isMatched = await bcrypt.compare(
      credentials.password,
      admin.password
    );

    if (!isMatched) {
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtService.signAsync(
      {
        id: admin?.id || admin?._id,
        email: admin?.email,
        role: admin?.role,
      },
      { secret: this.configService.get<string>("JWT_SECRET") }
    );

    return `Bearer ${token}`;
  }

  async findAll() {
    const admins = await this.adminModel.find({}).select("-password");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admins retrieved successful!",
      data: admins,
    };
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id).select("-password");
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admin retrieved successful!",
      data: admin,
    };
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    await this.adminModel.findByIdAndUpdate(id, {
      $set: { ...updateAdminDto },
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admin updated successful!",
      data: null,
    };
  }

  async updateProfilePhoto(id: string, file: Express.Multer.File) {
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
            const user = await this.adminModel.findById(id);
            if (!user) {
              throw new HttpException(
                "User was not found!",
                HttpStatus.NOT_FOUND
              );
            }
            await this.adminModel.findByIdAndUpdate(id, {
              $set: { photo: result?.secure_url },
            });

            if (user?.photo) {
              const publicId = extractPublicId(user.photo);

              if (publicId) {
                this.eventEmitter.emit("admin-photo.deleted", publicId);
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
                "Failed to update admin photo",
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

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException("Admin was not found");
    }
    const isMatched = await bcrypt.compare(data.oldPassword, admin.password);
    if (!isMatched) {
      throw new BadRequestException(
        "Incorrect password, Please provide your correct old password"
      );
    }
    const newPassword = await bcrypt.hash(data.newPassword, 12);
    await this.adminModel.findByIdAndUpdate(id, {
      $set: { password: newPassword },
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message:
        "Your password has been changed. Please login again with new credentials.",
      data: null,
    };
  }
}
