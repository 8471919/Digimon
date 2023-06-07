import { Admin } from '@prisma/client';

export type FindOneAdminByOptionsOutputDto = Omit<Admin, 'password'>;
