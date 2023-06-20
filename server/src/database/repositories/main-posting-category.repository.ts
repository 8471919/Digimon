import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MainPostingCategoryRepositoryOutbountPort } from './outbound-ports/main-posting-category-repository.outbound-port';
import {
  CreateMainPostingCategoriesInputDto,
  CreateManyMainPostingCategoryOutputDto,
} from '../dtos/main-posting-category/main-posting-category.outbount-port.dto';

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
}
