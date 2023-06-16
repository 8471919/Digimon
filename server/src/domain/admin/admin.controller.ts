import { Controller, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypedParam, TypedRoute } from '@nestia/core';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';
import typia from 'typia';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAdminGuard)
  @TypedRoute.Get(':id')
  async getAdminInfoForSelf(
    @User() user: AdminLogInDto,
    @TypedParam('id') id: number,
  ): Promise<FindOneAdminExceptPasswordDto> {
    if (user.id !== id) {
      throw new UnauthorizedException('UnAuthorized');
    }

    const admin = await this.adminService.getAdminInfo({ id });

    return admin;
  }

  @TypedRoute.Get(':id/info')
  async getAdminInfoForCommon(@TypedParam('id') id: number) {
    const admin = await this.adminService.getAdminInfoForCommon({ id });

    return admin;
  }
}
