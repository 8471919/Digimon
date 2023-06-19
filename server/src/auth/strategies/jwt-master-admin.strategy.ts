import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminJwtDto } from 'src/database/dtos/auth/admin-login.dto';
import { ADMIN_GRADE } from 'src/database/values/admin-grade.value';

@Injectable()
export class JwtMasterAdminStratety extends PassportStrategy(
  Strategy,
  'jwt-master-admin',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_KEY_ADMIN'),
    });
  }

  async validate(payload: AdminJwtDto) {
    const { iat, exp, ...user } = payload;
    if (user.type !== 'admin') {
      throw new BadRequestException('UnAuthorized');
    }

    if (user.gradeId !== ADMIN_GRADE.master) {
      throw new BadRequestException('UnAuthorized');
    }

    return user;
  }
}
