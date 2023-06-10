import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AdminStrategy } from './strategies/admin.strategy';
import { ADMIN_REPOSITORY_OUTBOUND_PORT } from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import { AdminRepository } from 'src/database/repositories/admin.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('ACCESS_TOKEN_KEY_ADMIN'),
          signOptions: { expiresIn: '30m', algorithm: 'HS256' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: ADMIN_REPOSITORY_OUTBOUND_PORT,
      useClass: AdminRepository,
    },
    AuthService,
    AdminStrategy,
    JwtAdminStrategy,
  ],
})
export class AuthModule {}
