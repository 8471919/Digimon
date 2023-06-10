import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypedRoute } from '@nestia/core';
import { AdminGuard } from './guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';

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
}
