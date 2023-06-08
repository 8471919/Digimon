import { Admin } from '@prisma/client';

export interface AdminSignUpInputDto
  extends Omit<
    Pick<
      Admin,
      | 'email'
      | 'password'
      | 'firstName'
      | 'lastName'
      | 'nickname'
      | 'emailReception'
      | 'genderId'
      | 'gradeId'
    > &
      Partial<Pick<Admin, 'middleName' | 'introduction'>>,
    never
  > {
  /**
   * @format date
   */
  birth: string | Date;
}
