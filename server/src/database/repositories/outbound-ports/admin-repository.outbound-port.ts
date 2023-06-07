import { Admin } from '@prisma/client';
import { AdminOptionsDto } from 'src/database/dtos/admin/admin-options.dto';
import { FindOneAdminByOptionsOutputDto } from 'src/database/dtos/admin/admin.outbound-port.dto';

export const ADMIN_REPOSITORY_OUTBOUND_PORT =
  'ADMIN_REPOSITORY_OUTBOUND_PORT' as const;

export interface AdminRepositoryOutboundPort {
  findOneAdminForSignUp(email: string): Promise<Admin | null>;

  findOneAdminByOptions(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminByOptionsOutputDto | null>;
}
