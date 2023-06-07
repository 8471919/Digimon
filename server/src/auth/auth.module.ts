import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AdminStrategy } from './strategies/admin.strategy';
import { ADMIN_REPOSITORY_OUTBOUND_PORT } from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import { AdminRepository } from 'src/database/repositories/admin.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    {
      provide: ADMIN_REPOSITORY_OUTBOUND_PORT,
      useClass: AdminRepository,
    },
    AuthService,
    AdminStrategy,
  ],
})
export class AuthModule {}
