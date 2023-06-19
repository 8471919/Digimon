import { Controller } from '@nestjs/common';
import { MainPostingCategoryService } from './main-posting-category.service';

@Controller('api/v1/main-posting-category')
export class MainPostingCategoryController {
  constructor(
    private readonly mainPostingCategoryService: MainPostingCategoryService,
  ) {}
}
