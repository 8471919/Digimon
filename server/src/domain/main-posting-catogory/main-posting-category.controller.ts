import { Controller, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MainPostingCategoryService } from './main-posting-category.service';
import { TypedBody, TypedRoute } from '@nestia/core';
import { JwtMasterAdminGuard } from 'src/auth/guards/jwt-master-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { ADMIN_GRADE } from 'src/database/values/admin-grade.value';
import {
  FindAllCategoriesDto,
  SaveChangesMainPostingCategoryInputDto,
  SaveChangesMainPostingCategoryOutputDto,
} from 'src/database/dtos/main-posting-category/main-posting-category.outbount-port.dto';

@Controller('api/v1/main-posting-category')
export class MainPostingCategoryController {
  constructor(
    private readonly mainPostingCategoryService: MainPostingCategoryService,
  ) {}

  @UseGuards(JwtMasterAdminGuard)
  @TypedRoute.Get('list')
  async getAllCategories(
    @User() user: AdminLogInDto,
  ): Promise<FindAllCategoriesDto> {
    if (user.gradeId !== ADMIN_GRADE.master) {
      throw new UnauthorizedException('UnAuthorized');
    }

    const categories = await this.mainPostingCategoryService.getAllCategories();

    return categories;
  }

  @UseGuards(JwtMasterAdminGuard)
  @TypedRoute.Put()
  async saveCategoryChanges(
    @TypedBody() body: SaveChangesMainPostingCategoryInputDto,
    @User() user: AdminLogInDto,
  ): Promise<SaveChangesMainPostingCategoryOutputDto> {
    if (user.gradeId !== ADMIN_GRADE.master) {
      throw new UnauthorizedException('UnAuthorized');
    }

    const res = this.mainPostingCategoryService.saveCategoryChanges(body);

    return res;
  }
}
