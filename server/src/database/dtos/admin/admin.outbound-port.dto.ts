import { AdminEntity } from 'src/database/models/admin/admin.entity';
import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';

export type FindOneAdminExceptPasswordDto = Omit<AdminEntity.Admin, 'password'>;

export interface FindAdminInfoForCommonDto
  extends Pick<
    AdminEntity.Admin,
    'id' | 'nickname' | 'introduction' | 'gradeId'
  > {
  mainPostings: MainPostingEntity.MainPosting[];
}

export type FindAdminForListForCommonDto = Omit<
  FindAdminInfoForCommonDto,
  'mainPostings'
>;
