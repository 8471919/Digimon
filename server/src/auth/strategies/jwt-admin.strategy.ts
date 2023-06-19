import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminJwtDto } from 'src/database/dtos/auth/admin-login.dto';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
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

    return user;
  }
}
