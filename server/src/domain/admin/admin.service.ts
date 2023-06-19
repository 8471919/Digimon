import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AdminOptionsDto } from 'src/database/dtos/admin/admin-options.dto';
import { UpdateAdminInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';
import {
  FindAdminForListForCommonDto,
  FindAdminInfoForCommonDto,
  FindOneAdminExceptPasswordDto,
} from 'src/database/dtos/admin/admin.outbound-port.dto';
import {
  ADMIN_REPOSITORY_OUTBOUND_PORT,
  AdminRepositoryOutboundPort,
} from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT } from 'src/database/values/bcrypt-salt.value';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY_OUTBOUND_PORT)
    private readonly adminRepo: AdminRepositoryOutboundPort,
  ) {}

  async getAdminInfo(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminExceptPasswordDto> {
    const admin = await this.adminRepo.findOneAdminByOptions(options);

    if (!admin) {
      throw new BadRequestException('Option is incorrect');
    }

    return admin;
  }

  async getAdminInfoForCommon(
    options: AdminOptionsDto,
  ): Promise<FindAdminInfoForCommonDto> {
    const admin = await this.adminRepo.findOneAdminForCommon(options);

    if (!admin) {
      throw new BadRequestException('Option is incorrect');
    }

    return admin;
  }

  async getAdminList(
    options: AdminOptionsDto,
  ): Promise<FindAdminForListForCommonDto> {
    const admins = await this.adminRepo.findAdminList(options);

    if (!admins) {
      throw new BadRequestException('Option is incorrect');
    }

    return admins;
  }

  async modifyAdminInfo(
    id: number,
    data: UpdateAdminInputDto,
  ): Promise<FindOneAdminExceptPasswordDto> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_SALT);
    }

    const admin = await this.adminRepo.updateAdmin(id, data);

    if (!admin) {
      throw new BadRequestException('Option is incorrect');
    }

    return admin;
  }
}
