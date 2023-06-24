import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './domain/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MainPostingCategoryModule } from './domain/main-posting-catogory/main-posting-category.module';
import { MainPostingModule } from './domain/main-posting/main-posting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    AdminModule,
    MainPostingCategoryModule,
    MainPostingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
