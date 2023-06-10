import { Admin } from '@prisma/client';
import { AdminOptionsDto } from 'src/database/dtos/admin/admin-options.dto';
import { AdminSignUpInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';

export const ADMIN_REPOSITORY_OUTBOUND_PORT =
  'ADMIN_REPOSITORY_OUTBOUND_PORT' as const;

export interface AdminRepositoryOutboundPort {
  insertAdmin(
    adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null>;

  findOneAdminForSign(email: string): Promise<Admin | null>;

  findOneAdminByOptions(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminExceptPasswordDto | null>;
}
