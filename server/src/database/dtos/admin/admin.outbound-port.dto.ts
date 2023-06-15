import { Admin, MainPosting } from '@prisma/client';
import { DateKeyToString } from 'src/utils/types/date-to-string.type';

export type FindOneAdminExceptPasswordDto = DateKeyToString<
  Omit<Admin, 'password'>
>;

export interface FindAdminInfoForCommonDto
  extends Pick<Admin, 'id' | 'nickname' | 'introduction'> {
  mainPostings: DateKeyToString<MainPosting>[];
}
