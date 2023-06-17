import { Controller, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';
import { UpdateAdminPasswordInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';

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

  @UseGuards(JwtAdminGuard)
  @TypedRoute.Put(':id')
  async modifyPassword(
    @TypedParam('id') id: number,
    @TypedBody() body: UpdateAdminPasswordInputDto,
    @User() user: AdminLogInDto,
  ): Promise<FindOneAdminExceptPasswordDto> {
    if (id !== user.id) {
      throw new UnauthorizedException('UnAuthorized');
    }

    const admin = await this.adminService.modifyAdminInfo(user.id, {
      password: body.password,
    });

    return admin;
  }
}
