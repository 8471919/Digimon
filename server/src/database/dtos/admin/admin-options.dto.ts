import { AdminEntity } from 'src/database/models/admin/admin.entity';

export type AdminOptionsDto = Partial<
  Pick<AdminEntity.Admin, 'id' | 'email' | 'nickname' | 'gradeId'>
>;
