import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AdminRepository } from 'src/database/repositories/admin.repository';
import { ADMIN_REPOSITORY_OUTBOUND_PORT } from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [
    {
      provide: ADMIN_REPOSITORY_OUTBOUND_PORT,
      useClass: AdminRepository,
    },
    AdminService,
  ],
})
export class AdminModule {}
