import { AdminEntity } from 'src/database/models/admin/admin.entity';

export type AdminSignUpInputDto = Pick<
  AdminEntity.Admin,
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'emailReception'
  | 'genderId'
  | 'gradeId'
  | 'birth'
  | 'introduction'
  | 'middleName'
>;
