import { AdminOptionsDto } from 'src/database/dtos/admin/admin-options.dto';
import {
  AdminSignUpInputDto,
  UpdateAdminInputDto,
} from 'src/database/dtos/admin/admin.inbound-port.dto';
import {
  FindAdminForListForCommonDto,
  FindAdminInfoForCommonDto,
  FindOneAdminExceptPasswordDto,
} from 'src/database/dtos/admin/admin.outbound-port.dto';
import { AdminEntity } from 'src/database/models/admin/admin.entity';

export const ADMIN_REPOSITORY_OUTBOUND_PORT =
  'ADMIN_REPOSITORY_OUTBOUND_PORT' as const;

export interface AdminRepositoryOutboundPort {
  insertAdmin(
    adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null>;

  findOneAdminForSign(email: string): Promise<AdminEntity.Admin | null>;

  findOneAdminByOptions(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminExceptPasswordDto | null>;

  findOneAdminForCommon(
    options: AdminOptionsDto,
  ): Promise<FindAdminInfoForCommonDto | null>;

  updateAdmin(
    id: number,
    data: UpdateAdminInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null>;

  findAdminList(
    options: AdminOptionsDto,
  ): Promise<FindAdminForListForCommonDto[] | null>;
}
