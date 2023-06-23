import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  FindAllCategoriesDto,
  SaveChangesMainPostingCategoryInputDto,
  SaveChangesMainPostingCategoryOutputDto,
} from 'src/database/dtos/main-posting-category/main-posting-category.outbount-port.dto';
import {
  MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT,
  MainPostingCategoryRepositoryOutbountPort,
} from 'src/database/repositories/outbound-ports/main-posting-category-repository.outbound-port';

@Injectable()
export class MainPostingCategoryService {
  constructor(
    @Inject(MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT)
    private readonly mainPostingCategoryRepo: MainPostingCategoryRepositoryOutbountPort,
  ) {}

  async saveCategoryChanges(
    data: SaveChangesMainPostingCategoryInputDto,
  ): Promise<SaveChangesMainPostingCategoryOutputDto> {
    const res = this.mainPostingCategoryRepo.saveChanges(data);

    return res;
  }

  async getAllCategories(): Promise<FindAllCategoriesDto> {
    const categories = await this.mainPostingCategoryRepo.findAllCategories();

    if (!categories) {
      throw new NotFoundException('no categories');
    }

    return categories;
  }
}
