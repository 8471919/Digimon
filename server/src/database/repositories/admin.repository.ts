import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AdminRepositoryOutboundPort } from './outbound-ports/admin-repository.outbound-port';
import { AdminOptionsDto } from '../dtos/admin/admin-options.dto';
import {
  FindAdminInfoForCommonDto,
  FindOneAdminExceptPasswordDto,
} from '../dtos/admin/admin.outbound-port.dto';
import typia from 'typia';
import { TypeToSelect } from 'src/utils/types/type-to-select.type';
import {
  AdminSignUpInputDto,
  UpdateAdminInputDto,
} from '../dtos/admin/admin.inbound-port.dto';
import { dateAndBigIntToString } from 'src/utils/functions/date-and-bigint-to-string.function';
import { AdminEntity } from '../models/admin/admin.entity';

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

    return dateAndBigIntToString(admin);
  }

  async findOneAdminForSign(email: string): Promise<AdminEntity.Admin | null> {
    const admin = await this.prisma.admin.findFirst({
      where: { email },
    });

    return dateAndBigIntToString(admin);
  }

  async findOneAdminByOptions(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const admin = await this.prisma.admin.findFirst({
      select: typia.random<TypeToSelect<FindOneAdminExceptPasswordDto>>(),
      where: options,
    });

    return dateAndBigIntToString(admin);
  }

  async findOneAdminForCommon(
    options: AdminOptionsDto,
  ): Promise<FindAdminInfoForCommonDto | null> {
    const admin = await this.prisma.admin.findFirst({
      select: typia.random<TypeToSelect<FindAdminInfoForCommonDto>>(),
      where: options,
    });

    return dateAndBigIntToString(admin);
  }

  async updateAdmin(
    id: number,
    data: UpdateAdminInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const admin = await this.prisma.admin.update({
      data: data,
      where: { id },
      select: typia.random<TypeToSelect<FindOneAdminExceptPasswordDto>>(),
    });

    return dateAndBigIntToString(admin);
  }
}
