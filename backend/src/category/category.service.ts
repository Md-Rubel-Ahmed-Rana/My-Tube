import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import { Model, Types } from "mongoose";
import { Slugify } from "src/utils/slugify";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.slug = Slugify.generateCategorySlug(
      createCategoryDto?.name
    );
    await this.categoryModel.create(createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Category created successfully",
      data: null,
    };
  }

  async findAll(
    searchText: string,
    sortBy: "createdAt" | "priority" | "name",
    sortOrder: "asc" | "desc",
    page: number,
    limit: number
  ) {
    const filter = searchText
      ? { name: { $regex: searchText, $options: "i" } }
      : {};

    const sortOption: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      this.categoryModel.find(filter).sort(sortOption).skip(skip).limit(limit),
      this.categoryModel.countDocuments(filter),
    ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Categories retrieved successfully",
      data: {
        categories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAvailableVideosCategories() {
    const categories = await this.categoryModel.aggregate([
      {
        $lookup: {
          from: "videos",
          localField: "name",
          foreignField: "category",
          as: "videos",
        },
      },
      {
        $match: {
          "videos.0": { $exists: true },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          slug: 1,
          icon_url: 1,
          is_active: 1,
          priority: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Available categories retrieved successfully",
      data: categories,
    };
  }

  async findOne(id: Types.ObjectId) {
    const category = await this.categoryModel.findById(id);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Category retrieved successfully",
      data: category,
    };
  }

  async update(id: Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    if (updateCategoryDto.name) {
      updateCategoryDto.slug = Slugify.generateCategorySlug(
        updateCategoryDto?.name
      );
    }
    await this.categoryModel.findByIdAndUpdate(id, {
      ...updateCategoryDto,
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Category updated successfully",
      data: null,
    };
  }

  async remove(id: Types.ObjectId) {
    await this.categoryModel.findByIdAndDelete(id);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Category deleted successfully",
      data: null,
    };
  }
}
