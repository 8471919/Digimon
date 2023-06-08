import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypedBody, TypedRoute } from '@nestia/core';
import { AdminGuard } from './guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';
import { AdminSignUpInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AdminGuard)
  @TypedRoute.Post('sign-in')
  async adminSignIn(@User() user) {
    console.log(user);
    return user;
  }

  // @TypedRoute.Post('master-sign-up')
  // async masterSignUp(
  //   @TypedBody() adminInfo: AdminSignUpInputDto,
  // ): Promise<FindOneAdminExceptPasswordDto | null> {
  //   return this.authService.adminSignUp(adminInfo);
  // }
}
