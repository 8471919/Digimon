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

export type FindCategoryListDto = {
  categories: MainPostingCategoryEntity[];
};

export type SaveChangesMainPostingCategoryInputDto = {
  create: Array<Omit<MainPostingCategoryEntity, 'id'>>;
  update: Array<MainPostingCategoryEntity>;
  delete: Array<MainPostingCategoryEntity['id']>;
};

export type SaveChangesMainPostingCategoryOutputDto = {
  isCreated: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
};
