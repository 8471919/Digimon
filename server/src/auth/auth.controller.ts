import { Controller, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypedRoute } from '@nestia/core';
import { AdminGuard } from './guards/admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AdminGuard)
  @TypedRoute.Post('sign-up')
  async adminSignIn(@Req() req) {
    console.log(req.user);
    return req.user;
  }
}
