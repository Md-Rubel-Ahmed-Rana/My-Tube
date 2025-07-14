import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Types } from "mongoose";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query("searchText") searchText: string,
    @Query("sortBy") sortBy: "createdAt" | "priority" | "name" = "createdAt",
    @Query("sortOrder") sortOrder: "asc" | "desc" = "desc",
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    return this.categoryService.findAll(
      searchText,
      sortBy,
      sortOrder,
      Number(page),
      Number(limit)
    );
  }

  @Get("with-videos")
  getAvailableVideosCategories() {
    return this.categoryService.getAvailableVideosCategories();
  }

  @Get(":id")
  findOne(@Param("id") id: Types.ObjectId) {
    return this.categoryService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: Types.ObjectId,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: Types.ObjectId) {
    return this.categoryService.remove(id);
  }
}
