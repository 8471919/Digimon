import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AdminOptionsDto } from 'src/database/dtos/admin/admin-options.dto';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';
import {
  ADMIN_REPOSITORY_OUTBOUND_PORT,
  AdminRepositoryOutboundPort,
} from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';

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

  async getAdminInfoForCommon(options: AdminOptionsDto) {
    const admin = await this.adminRepo.findOneAdminForCommon(options);

    if (!admin) {
      throw new BadRequestException('Option is incorrect');
    }

    return admin;
  }
}
