import { Admin } from '@prisma/client';

export type AdminLogInDto = Pick<
  Admin,
  'id' | 'email' | 'gradeId' | 'nickname'
>;
