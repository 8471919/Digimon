import { Admin } from '@prisma/client';

export type FindOneAdminExceptPasswordDto = Omit<Admin, 'password'>;
