import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AdminRepository } from 'src/database/repositories/admin.repository';
import { ADMIN_REPOSITORY_OUTBOUND_PORT } from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    {
      provide: ADMIN_REPOSITORY_OUTBOUND_PORT,
      useClass: AdminRepository,
    },
    AuthService,
  ],
})
export class AdminModule {}
