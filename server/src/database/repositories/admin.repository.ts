import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AdminRepositoryOutboundPort } from './outbound-ports/admin-repository.outbound-port';
import { AdminOptionsDto } from '../dtos/admin/admin-options.dto';
import { FindOneAdminExceptPasswordDto } from '../dtos/admin/admin.outbound-port.dto';
import typia from 'typia';
import { TypeToSelect } from 'src/utils/types/type-to-select.type';
import { Admin } from '@prisma/client';
import { AdminSignUpInputDto } from '../dtos/admin/admin.inbound-port.dto';
import { DateKeyToString } from 'src/utils/types/date-to-string.type';
import { dateNullToStringNull } from 'src/utils/functions/date-null-to-string-null.function';

@Injectable()
export class AdminRepository implements AdminRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}

  async insertAdmin(
    adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const admin = await this.prisma.admin.create({
      data: adminInfo,
      select: typia.random<TypeToSelect<FindOneAdminExceptPasswordDto>>(),
    });

    return {
      ...admin,
      createdAt: dateNullToStringNull(admin.createdAt),
      updatedAt: dateNullToStringNull(admin.updatedAt),
      deletedAt: dateNullToStringNull(admin.deletedAt),
      birth: admin.birth.toISOString(),
    };
  }

  async findOneAdminForSign(
    email: string,
  ): Promise<DateKeyToString<Admin> | null> {
    const admin = await this.prisma.admin.findFirst({
      where: { email },
    });

    if (!admin) {
      throw new BadRequestException('email is wrong');
    }

    return {
      ...admin,
      createdAt: dateNullToStringNull(admin.createdAt),
      updatedAt: dateNullToStringNull(admin.updatedAt),
      deletedAt: dateNullToStringNull(admin.deletedAt),
      birth: admin.birth.toISOString(),
    };
  }

  async findOneAdminByOptions(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const admin = await this.prisma.admin.findFirst({
      select: typia.random<TypeToSelect<FindOneAdminExceptPasswordDto>>(),
      where: options,
    });

    if (!admin) {
      throw new BadRequestException('Incorrect options');
    }

    return {
      ...admin,
      createdAt: dateNullToStringNull(admin.createdAt),
      updatedAt: dateNullToStringNull(admin.updatedAt),
      deletedAt: dateNullToStringNull(admin.deletedAt),
      birth: admin.birth.toISOString(),
    };
  }
}
