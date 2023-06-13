import { Admin } from '@prisma/client';
import { DateKeyToString } from 'src/utils/types/date-to-string.type';

export type AdminSignUpInputDto = DateKeyToString<
  Omit<
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
      | 'birth'
    > &
      Partial<Pick<Admin, 'middleName' | 'introduction'>>,
    never
  >
>;
