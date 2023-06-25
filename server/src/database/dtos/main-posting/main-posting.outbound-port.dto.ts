import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';

export type CreateMainPostingInputDto = Pick<
  MainPostingEntity.MainPosting,
  'title' | 'content' | 'categoryId'
>;

export type FindMainPostingOptionsDto = Partial<
  Pick<MainPostingEntity.MainPosting, 'id' | 'adminId' | 'categoryId'>
>;

export type FindMainPostingListOutputDto = {
  mainPostings: Pick<
    MainPostingEntity.MainPosting,
    'id' | 'adminId' | 'categoryId' | 'title' | 'createdAt'
  >[];
};

export type FindMainPostingListOptionsForPagenationDto = {
  options?: Partial<
    Pick<MainPostingEntity.MainPosting, 'adminId' | 'categoryId'>
  >;

  order?: {
    type: 'createdAt';
    order: 'desc' | 'asc';
  };

  /**
   * @type int
   */
  pageNumber: number;

  /**
   * @type int
   */
  countPerPage: number;
};
