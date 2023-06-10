import { Admin } from '@prisma/client';
import { UserType } from 'src/database/values/user-type.value';

export type AdminLogInDto = Pick<
  Admin,
  'id' | 'email' | 'gradeId' | 'nickname'
>;

export interface AdminJwtDto extends AdminLogInDto {
  type: UserType;

  /**
   * @type int
   */
  iat: number;

  /**
   * @type int
   */
  exp: number;
}
