import {
  FindAdminInfoForCommonDto,
  FindOneAdminExceptPasswordDto,
} from '../admin/admin.outbound-port.dto';

export type SelectFindOneAdminExceptPasswordDto = {
  [P in keyof FindOneAdminExceptPasswordDto as `${P}`]: FindOneAdminExceptPasswordDto[P];
};

export type SelectFindAdminInfoForCommonDto = {
  [P in keyof FindAdminInfoForCommonDto as `${P}`]: FindAdminInfoForCommonDto[P];
};
