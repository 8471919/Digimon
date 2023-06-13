import { Admin } from '@prisma/client';
import { DateKeyToString } from 'src/utils/types/date-to-string.type';

export type FindOneAdminExceptPasswordDto = DateKeyToString<
  Omit<Admin, 'password'>
>;
