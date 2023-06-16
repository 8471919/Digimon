import { Admin, MainPosting } from '@prisma/client';
import { DateAndBigIntToString } from 'src/utils/types/date-to-string.type';

export type FindOneAdminExceptPasswordDto = DateAndBigIntToString<
  Omit<Admin, 'password'>
>;

export interface FindAdminInfoForCommonDto
  extends Pick<Admin, 'id' | 'nickname' | 'introduction'> {
  mainPostings: DateAndBigIntToString<MainPosting>[];
}
