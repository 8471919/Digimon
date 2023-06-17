import { AdminEntity } from 'src/database/models/admin/admin.entity';
import { CommonDateEntity } from 'src/database/models/common/common-date.entity';
import { OmitAmongObject } from 'src/utils/types/omit-among-object.type';

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

export type UpdateAdminPasswordInputDto = Pick<AdminEntity.Admin, 'password'>;

export type UpdateAdminNicknameInputDto = Pick<AdminEntity.Admin, 'nickname'>;

export type UpdateAdminInputDto = Partial<
  Omit<OmitAmongObject<AdminEntity.Admin, CommonDateEntity>, 'id' | 'gradeId'>
>;
