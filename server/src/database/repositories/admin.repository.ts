import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AdminRepositoryOutboundPort } from './outbound-ports/admin-repository.outbound-port';
import { AdminOptionsDto } from '../dtos/admin/admin-options.dto';
import {
  FindAdminInfoForCommonDto,
  FindAdminForListForCommonDto,
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
import {
  SelectFindAdminInfoForCommonDto,
  SelectFindOneAdminExceptPasswordDto,
} from '../dtos/select/admin-select.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminRepository implements AdminRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}

  async insertAdmin(
    adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const admin = await this.prisma.admin.create({
      data: adminInfo,
      select: typia.random<TypeToSelect<SelectFindOneAdminExceptPasswordDto>>(),
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
      select: typia.random<TypeToSelect<SelectFindOneAdminExceptPasswordDto>>(),
      where: options,
    });

    return dateAndBigIntToString(admin);
  }

  async findOneAdminForCommon(
    options: AdminOptionsDto,
  ): Promise<FindAdminInfoForCommonDto | null> {
    const admin = await this.prisma.admin.findFirst({
      select: typia.random<TypeToSelect<SelectFindAdminInfoForCommonDto>>(),
      where: options,
      orderBy: {
        gradeId: 'asc',
      },
    });

    return dateAndBigIntToString(admin);
  }

  async findAdminList(
    options: Partial<
      Pick<AdminEntity.Admin, 'email' | 'nickname' | 'gradeId' | 'id'>
    >,
  ): Promise<FindAdminForListForCommonDto[] | null> {
    const admins = await this.prisma.admin.findMany({
      select: typia.random<TypeToSelect<FindAdminForListForCommonDto>>(),
    });

    return dateAndBigIntToString(admins);
  }

  async updateAdmin(
    id: number,
    data: UpdateAdminInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    if (data.email) {
      const temp = await this.prisma.admin.findUnique({
        where: { email: data.email },
        select: { email: true },
      });

      if (temp) {
        throw new BadRequestException('existed email');
      }
    }

    if (data.password) {
      const temp = await this.prisma.admin.findUnique({
        where: { id },
        select: { password: true },
      });

      if (!temp) {
        throw new UnauthorizedException('UnAuthorized');
      }

      const isSame = await bcrypt.compare(temp.password, data.password);

      if (isSame) {
        throw new BadRequestException('Same password as before');
      }
    }

    if (data.nickname) {
      const temp = await this.prisma.admin.findUnique({
        where: { nickname: data.nickname },
        select: { nickname: true },
      });
      if (temp) {
        throw new BadRequestException(`${data.nickname} exist`);
      }
    }

    const admin = await this.prisma.admin.update({
      data: data,
      where: { id },
      select: typia.random<TypeToSelect<SelectFindOneAdminExceptPasswordDto>>(),
    });

    return dateAndBigIntToString(admin);
  }
}
