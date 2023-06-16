import { Admin } from '@prisma/client';
import { DateAndBigIntToString } from 'src/utils/types/date-to-string.type';

export type AdminSignUpInputDto = DateAndBigIntToString<
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
