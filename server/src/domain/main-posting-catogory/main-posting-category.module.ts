import { Module } from '@nestjs/common';
import { MainPostingCategoryController } from './main-posting-category.controller';
import { MainPostingCategoryService } from './main-posting-category.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT } from 'src/database/repositories/outbound-ports/main-posting-category-repository.outbound-port';
import { MainPostingCategoryRepository } from 'src/database/repositories/main-posting-category.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MainPostingCategoryController],
  providers: [
    {
      provide: MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT,
      useClass: MainPostingCategoryRepository,
    },
    MainPostingCategoryService,
  ],
})
export class MainPostingCategoryModule {}
