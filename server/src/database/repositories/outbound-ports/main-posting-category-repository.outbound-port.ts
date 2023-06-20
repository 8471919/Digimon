import {
  CreateMainPostingCategoriesInputDto,
  CreateManyMainPostingCategoryOutputDto,
} from 'src/database/dtos/main-posting-category/main-posting-category.outbount-port.dto';

export const MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT =
  'MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT' as const;

/**
 * Category insert, update시에 parentId가 있는 경우,
 * 해당 parentId의 카테고리에 parentId가 있으면, 에러를 던져야 한다.
 * 어차피 master admin만 사용가능한 api이니,
 * select을 한 번 더 하는 것은 문제가 되지 않을 것이라고 판단. (join말고, select)
 */
export interface MainPostingCategoryRepositoryOutbountPort {
  insertCategories(
    data: CreateMainPostingCategoriesInputDto,
  ): Promise<CreateManyMainPostingCategoryOutputDto | null>;
}
