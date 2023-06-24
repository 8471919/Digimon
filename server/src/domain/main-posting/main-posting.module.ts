import { Module } from '@nestjs/common';
import { MainPostingController } from './main-posting.controller';
import { MainPostingService } from './main-posting.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MAIN_POSTING_REPOSITORY_OUTBOUND_PORT } from 'src/database/repositories/outbound-ports/main-posting-repository.outbound-port';
import { MainPostingRepository } from 'src/database/repositories/main-posting.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MainPostingController],
  providers: [
    {
      provide: MAIN_POSTING_REPOSITORY_OUTBOUND_PORT,
      useClass: MainPostingRepository,
    },
    MainPostingService,
  ],
})
export class MainPostingModule {}
