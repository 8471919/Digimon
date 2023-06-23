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

export type FindAllCategoriesDto = {
  categories: (MainPostingCategoryEntity & {
    childs: MainPostingCategoryEntity[];
  })[];
};

export type SaveChangesMainPostingCategoryInputDto = Partial<{
  create: Array<Omit<MainPostingCategoryEntity, 'id'>>;
  update: Array<MainPostingCategoryEntity>;

  /**
   * @type int
   */
  delete: Array<number>;
}>;

export type SaveChangesMainPostingCategoryOutputDto = {
  isCreated: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
};
