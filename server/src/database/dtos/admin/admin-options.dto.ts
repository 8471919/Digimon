import { Admin } from '@prisma/client';

export type AdminOptionsDto = Partial<
  Pick<Admin, 'id' | 'email' | 'nickname' | 'gradeId'>
>;
