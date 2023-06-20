import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MainPostingCategoryRepositoryOutbountPort } from './outbound-ports/main-posting-category-repository.outbound-port';
import {
  CreateMainPostingCategoriesInputDto,
  CreateManyMainPostingCategoryOutputDto,
  FindCategoryListDto,
} from '../dtos/main-posting-category/main-posting-category.outbount-port.dto';
import { MainPostingCategoryEntity } from '../models/main-posting/main-posting-category.entity';
import { IsDeletedOutputDto } from '../dtos/common/crud-bool.dto';

@Injectable()
export class MainPostingCategoryRepository
  implements MainPostingCategoryRepositoryOutbountPort
{
  constructor(private readonly prisma: PrismaService) {}

  async insertCategories(
    data: CreateMainPostingCategoriesInputDto,
  ): Promise<CreateManyMainPostingCategoryOutputDto | null> {
    const categories = await this.prisma.mainPostingCategory.createMany({
      data: data.categories,
    });

    if (data.categories.length !== categories.count) {
      throw new BadRequestException('Incorrect option');
    }
    return { createdCategories: categories.count };
  }

  async findCategory(
    categoryId: number,
  ): Promise<MainPostingCategoryEntity | null> {
    const category = await this.prisma.mainPostingCategory.findFirst({
      where: { id: categoryId },
    });

    return category;
  }

  async updateCategory(
    data: MainPostingCategoryEntity,
  ): Promise<MainPostingCategoryEntity | null> {
    const { id, ...input } = data;

    const category = await this.prisma.mainPostingCategory.update({
      data: input,
      where: { id },
    });

    return category;
  }

  async updateCategories(
    data: MainPostingCategoryEntity[],
  ): Promise<FindCategoryListDto | null> {
    const categories: Array<MainPostingCategoryEntity> = [];

    for (const input of data) {
      const category = await this.updateCategory(input);
      if (!category) {
        throw new BadRequestException('Incorrect option');
      }
      categories.push(category);
    }

    return { categories };
  }

  async deleteCategory(categoryId: number): Promise<IsDeletedOutputDto> {
    const category = await this.prisma.mainPostingCategory.delete({
      where: { id: categoryId },
    });

    if (!category) {
      return { deleted: false };
    }

    return { deleted: true };
  }

  async deleteCategories(categoryIds: number[]): Promise<IsDeletedOutputDto> {
    for (const categoryId of categoryIds) {
      const res = await this.deleteCategory(categoryId);

      if (res.deleted === false) {
        throw new BadRequestException('Incorrect option');
      }
    }

    return { deleted: true };
  }
}
