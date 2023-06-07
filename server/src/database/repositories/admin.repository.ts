import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AdminRepositoryOutboundPort } from './outbound-ports/admin-repository.outbound-port';
import { AdminOptionsDto } from '../dtos/admin/admin-options.dto';
import { FindOneAdminByOptionsOutputDto } from '../dtos/admin/admin.outbound-port.dto';
import typia from 'typia';
import { TypeToSelect } from 'src/utils/types/type-to-select.type';

@Injectable()
export class AdminRepository implements AdminRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}

  async findOneAdminByOptions(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminByOptionsOutputDto | null> {
    const admin = await this.prisma.admin.findFirst({
      select: typia.random<TypeToSelect<FindOneAdminByOptionsOutputDto>>(),
      where: options,
    });

    return admin;
  }
}
