import { MainPostingCategoryEntity } from 'src/database/models/main-posting/main-posting-category.entity';

export type MainPostingCategoryInputDto = Pick<
  MainPostingCategoryEntity,
  'name' | 'orderId' | 'parentId'
>;

export type CreateMainPostingCategoriesInputDto = {
  categories: MainPostingCategoryInputDto[];
};

export type CreateManyMainPostingCategoryOutputDto = {
  createdCategories: number;
};
