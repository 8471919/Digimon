import { IsDeletedOutputDto } from 'src/database/dtos/common/crud-bool.dto';
import {
  SaveChangesMainPostingCategoryOutputDto,
  CreateMainPostingCategoriesInputDto,
  CreateManyMainPostingCategoryOutputDto,
  FindCategoryListDto,
  SaveChangesMainPostingCategoryInputDto,
  FindAllCategoriesDto,
} from 'src/database/dtos/main-posting-category/main-posting-category.outbount-port.dto';
import { MainPostingCategoryEntity } from 'src/database/models/main-posting/main-posting-category.entity';
import { MainPostingCategoryRepositoryOutbountPort } from 'src/database/repositories/outbound-ports/main-posting-category-repository.outbound-port';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';

type MockMainPostingCategoryRepositoryParamType =
  MockParamTypeForTest<MockMainPostingCategoryRepository>;

export class MockMainPostingCategoryRepository
  implements MainPostingCategoryRepositoryOutbountPort
{
  private readonly result: MockMainPostingCategoryRepositoryParamType;

  constructor(result: MockMainPostingCategoryRepositoryParamType) {
    this.result = result;
  }

  async saveChanges(
    input: SaveChangesMainPostingCategoryInputDto,
  ): Promise<SaveChangesMainPostingCategoryOutputDto> {
    const res = this.result.saveChanges?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async insertCategories(
    data: CreateMainPostingCategoriesInputDto,
  ): Promise<CreateManyMainPostingCategoryOutputDto | null> {
    const res = this.result.insertCategories?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async findCategory(
    categoryId: number,
  ): Promise<MainPostingCategoryEntity | null> {
    const res = this.result.findCategory?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async findAllCategories(): Promise<FindAllCategoriesDto | null> {
    const res = this.result.findAllCategories?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async updateCategory(
    data: MainPostingCategoryEntity,
  ): Promise<MainPostingCategoryEntity | null> {
    const res = this.result.updateCategory?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async updateCategories(
    data: MainPostingCategoryEntity[],
  ): Promise<FindCategoryListDto | null> {
    const res = this.result.updateCategories?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async deleteCategory(categoryId: number): Promise<IsDeletedOutputDto> {
    const res = this.result.deleteCategory?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async deleteCategories(categoryIds: number[]): Promise<IsDeletedOutputDto> {
    const res = this.result.deleteCategories?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }
}
