import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MainPostingCategoryRepositoryOutbountPort } from './outbound-ports/main-posting-category-repository.outbound-port';
import {
  CreateMainPostingCategoriesInputDto,
  CreateManyMainPostingCategoryOutputDto,
  FindAllCategoriesDto,
  FindCategoryListDto,
  SaveChangesMainPostingCategoryInputDto,
  SaveChangesMainPostingCategoryOutputDto,
} from '../dtos/main-posting-category/main-posting-category.outbount-port.dto';
import { MainPostingCategoryEntity } from '../models/main-posting/main-posting-category.entity';
import { IsDeletedOutputDto } from '../dtos/common/crud-bool.dto';

@Injectable()
export class MainPostingCategoryRepository
  implements MainPostingCategoryRepositoryOutbountPort
{
  constructor(private readonly prisma: PrismaService) {}

  // 해당 함수를 사용하기 전에, parentId인 category의 parentId가 null인지 확인해야한다.
  async saveChanges(
    input: SaveChangesMainPostingCategoryInputDto,
  ): Promise<SaveChangesMainPostingCategoryOutputDto> {
    /**
     * category의 depth는 2가 최대 이므로
     * 부모의 parentId가 null이 아니라면 에러를 던져야한다.
     */
    const parentIds: Set<number> = new Set();
    input.create?.forEach((el, i) => {
      if (!el.parentId) {
        return;
      }
      parentIds.add(el.parentId);
    });
    input.update?.forEach((el, i) => {
      if (!el.parentId) {
        return;
      }
      parentIds.add(el.parentId);
    });

    // 부모의 parentId가 null인 경우만 통과
    for (const parentId of parentIds) {
      const parent = await this.findCategory(parentId);

      if (!parent) {
        throw new BadRequestException('Incorrect option');
      }

      if (parent.parentId) {
        throw new BadRequestException('depth is more than 2');
      }
    }

    /**
     * delete하는 카테고리가 상위 카테고리면 삭제가 불가능하다.
     * 따라서 parentId가 null아면 에러를 던진다.
     */

    if (input.delete) {
      for (const id of input.delete) {
        const category = await this.findCategory(id);
        if (!category) {
          throw new BadRequestException('Incorrect option');
        }

        if (!category.parentId) {
          throw new BadRequestException(
            'Top-level categories can not be cleared',
          );
        }
      }
    }

    // 변경 도중 에러가 발생하면 롤백해야하므로 트랜잭션을 건다.
    const res = await this.prisma.$transaction(async (tx) => {
      const res: SaveChangesMainPostingCategoryOutputDto = {
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
      };

      // 삭제
      if (input.delete) {
        for (const id of input.delete) {
          const isDeleted = await tx.mainPostingCategory.delete({
            where: { id },
          });
        }
        res.isDeleted = true;
      }

      // 수정
      if (input.update) {
        for (const category of input.update) {
          const { id, ...data } = category;

          const isUpdated = await tx.mainPostingCategory.update({
            data: data,
            where: { id },
          });
        }
        res.isUpdated = true;
      }

      // 생성
      if (input.create) {
        const isCreated = await tx.mainPostingCategory.createMany({
          data: input.create,
        });
        res.isCreated = true;
      }

      return res;
    });

    return res;
  }

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

  async findAllCategories(): Promise<FindAllCategoriesDto | null> {
    const categories = await this.prisma.mainPostingCategory.findMany({
      where: {
        parentId: null,
      },
      include: {
        childs: true,
      },
    });

    return { categories };
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
      return { isDeleted: false };
    }

    return { isDeleted: true };
  }

  async deleteCategories(categoryIds: number[]): Promise<IsDeletedOutputDto> {
    for (const categoryId of categoryIds) {
      const res = await this.deleteCategory(categoryId);

      if (res.isDeleted === false) {
        throw new BadRequestException('Incorrect option');
      }
    }

    return { isDeleted: true };
  }
}
