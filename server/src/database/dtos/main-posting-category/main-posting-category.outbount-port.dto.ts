import { MainPostingCategoryEntity } from 'src/database/models/main-posting/main-posting-category.entity';

export type CreateMainPostingCategoriesInputDto = {
  categories: Pick<
    MainPostingCategoryEntity,
    'name' | 'orderId' | 'parentId'
  >[];
};

export type CreateManyMainPostingCategoryOutputDto = {
  createdCategories: number;
};
