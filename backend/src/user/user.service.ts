import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
import { generateUsername } from "src/utils/generateUsername";
import { GoogleLoginDto } from "src/auth/dto/google-login.dto";
import { Slugify } from "src/utils/slugify";
import { ChannelService } from "src/channel/channel.service";
import { UserStatus } from "./enums";
import { QueryUserDto } from "./dto/query-user.dto";
import { TypedEventEmitter } from "src/core/typed-event-emitter.service";

@Injectable()
export class UserService {
  constructor(
    private config: ConfigService,
    private channelService: ChannelService,
    @InjectModel(User.name) private userModel: Model<User>,
    private eventEmitter: EventEmitter2,
    private readonly emitter: TypedEventEmitter
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
    createUserDto.username = generateUsername(createUserDto?.email);
    createUserDto.slug = Slugify.generateUserSlug(
      createUserDto.name,
      createUserDto.username
    );

    const user: any = await this.userModel.create(createUserDto);

    // fire event to initiate user activity
    this.emitter.emit("user-activity.created", user._id as string);

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "User registration successful!",
      data: null,
    };
  }

  async findAll(query: QueryUserDto) {
    const { status, searchQuery, page = 1, limit = 20 } = query;

    const filter: Record<string, any> = {};

    if (status) {
      filter.status = status;
    }

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      filter.$or = [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
        { username: { $regex: regex } },
      ];
    }

    const skip = (page - 1) * limit;

    const data = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Users fetched successfully!",
      data,
    };
  }

  async findById(id: Types.ObjectId) {
    if (!id) {
      throw new NotFoundException("User id not found");
    }

    const user: any = await this.userModel.findById(id, "-password");
    const subscriptions = await this.channelService.getTotalSubscriptions(
      user?.id || user?._id
    );

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "User fetched successfully!",
      data: { ...user._doc, subscriptions, id: user?.id || user?._id },
    };
  }

  async findBySlug(slug: string) {
    const user: any = await this.userModel.findOne({ slug }, "-password");
    const subscriptions = await this.channelService.getTotalSubscriptions(
      user?.id || user?._id
    );
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "User fetched successfully!",
      data: { ...user._doc, subscriptions, id: user?.id || user?._id },
    };
  }

  async findByEmail(email: string) {
    await this.isExist("email", email);
    return await this.userModel.findOne({ email });
  }

  async getUserByEmailForGoogleLogin(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createUserWithGoogle(data: GoogleLoginDto) {
    data.username = generateUsername(data?.email);
    data.slug = Slugify.generateUserSlug(data.name, data.username);
    return await this.userModel.create(data);
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

  async updateStatus(id: Types.ObjectId, status: string) {
    await this.userModel.findByIdAndUpdate(id, { $set: { status } });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `User status updated to ${status} successfully!`,
      data: null,
    };
  }

  async softDelete(id: Types.ObjectId) {
    await this.userModel.findByIdAndUpdate(id, {
      $set: { status: UserStatus.DELETED },
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `User soft deletion done successfully!`,
      data: null,
    };
  }

  async hardDelete(id: Types.ObjectId) {
    await this.userModel.findByIdAndDelete(id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `User account deleted permanently!`,
      data: null,
    };
  }

  async getUsersStats() {
    const users = await this.userModel.aggregate([
      {
        $match: {
          status: { $ne: "deleted" },
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "owner",
          as: "videos",
        },
      },
      {
        $lookup: {
          from: "playlists",
          localField: "_id",
          foreignField: "user",
          as: "playlists",
        },
      },
      {
        $lookup: {
          from: "channels",
          localField: "_id",
          foreignField: "user",
          as: "channelData",
        },
      },
      {
        $unwind: {
          path: "$channelData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "channels",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$$userId", "$channels"],
                },
              },
            },
          ],
          as: "subscribers",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          username: 1,
          status: 1,
          slug: 1,
          totalVideos: { $size: "$videos" },
          totalPlaylists: { $size: "$playlists" },
          totalSubscribedChannels: {
            $cond: {
              if: { $isArray: "$channelData.channels" },
              then: { $size: "$channelData.channels" },
              else: 0,
            },
          },
          totalSubscribers: { $size: "$subscribers" },
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: `User analytics retrieved successfully!`,
      data: users,
    };
  }
}
