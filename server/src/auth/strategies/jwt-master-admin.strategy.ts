import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

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

  async validate(payload) {
    const { iat, exp, ...user } = payload;
  }
}
