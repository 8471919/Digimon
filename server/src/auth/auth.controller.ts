import {
  BadRequestException,
  Controller,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypedBody, TypedRoute } from '@nestia/core';
import { AdminGuard } from './guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { AdminSignUpInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';
import { ADMIN_GRADE } from 'src/database/values/admin-grade.value';
import { JwtMasterAdminGuard } from './guards/jwt-master-admin.guard';
import { JwtAdminGuard } from './guards/jwt-admin.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AdminGuard)
  @TypedRoute.Post('admin-login')
  async adminSignIn(@User() user: AdminLogInDto) {
    const token = await this.authService.adminSignIn(user);

    return token;
  }

  // @TypedRoute.Post('master-sign-up')
  // async masterSignUp(
  //   @TypedBody() adminInfo: AdminSignUpInputDto,
  // ): Promise<FindOneAdminExceptPasswordDto | null> {
  //   return this.authService.adminSignUp(adminInfo);
  // }

  @UseGuards(JwtMasterAdminGuard)
  @TypedRoute.Post('sign-up-by-master')
  async signUpByMaster(
    @User() user: AdminLogInDto,
    @TypedBody() adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    if (user.gradeId !== ADMIN_GRADE.master) {
      throw new UnauthorizedException('Only Master can Sign up');
    }

    if (adminInfo.gradeId === ADMIN_GRADE.master) {
      throw new BadRequestException('Grade Id is incorrect');
    }

    return this.authService.adminSignUp(adminInfo);
  }
}
