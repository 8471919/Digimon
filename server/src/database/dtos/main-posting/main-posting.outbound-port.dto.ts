import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';

export type CreateMainPostingInputDto = Pick<
  MainPostingEntity.MainPosting,
  'title' | 'content' | 'categoryId'
>;
